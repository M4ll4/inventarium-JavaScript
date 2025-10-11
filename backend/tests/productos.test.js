const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');

describe('Pruebas del módulo de productos', () => {

  let tokenAdmin = "";

  // 🔐 Antes de empezar, logueamos como admin para obtener un token
  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/api/usuarios/login')
      .send({
        email: 'sebastian@correo.com',
        contraseña: '123456'
      });

    tokenAdmin = loginResponse.body.token;
    // Si el test no obtiene token, fallo explícitamente
    if (!tokenAdmin) throw new Error("No se pudo obtener token para las pruebas");
  });

  test('Debería responder con estado 200 en GET /api/productos', async () => {
    const response = await request(app).get('/api/productos');
    expect(response.statusCode).toBe(200);
  });

  test('Debería crear un nuevo producto con POST /api/productos', async () => {
    const nuevoProducto = {
      nombre: 'Arroz Diana 500g',
      precio: 2500,
      stock: 100,
      categoria: 'Granos'
    };

    const response = await request(app)
      .post('/api/productos')
      .set('Authorization', `Bearer ${tokenAdmin}`) // <-- AÑADIR TOKEN
      .send(nuevoProducto);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nombre).toBe(nuevoProducto.nombre);
  });

  test('Debería obtener un producto por ID con GET /api/productos/:id', async () => {
  // 1. Creamos un producto primero
  const nuevoProducto = {
    nombre: 'Aceite Premier 1L',
    precio: 8000,
    stock: 50,
    categoria: 'Aceites'
  };

  const created = await request(app)
    .post('/api/productos')
    .set('Authorization', `Bearer ${tokenAdmin}`) // ✅ NECESARIO
    .send(nuevoProducto);

  const id = created.body.id;

  // 2. Consultamos el producto creado
  const response = await request(app)
    .get(`/api/productos/${id}`)
    .set('Authorization', `Bearer ${tokenAdmin}`); // ✅ NECESARIO

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('id', id);
  expect(response.body.nombre).toBe(nuevoProducto.nombre);
});

test('Debería actualizar un producto con PUT /api/productos/:id', async () => {
  // 1. Crear un producto inicial
  const nuevoProducto = {
    nombre: 'Azúcar Manuelita 1kg',
    precio: 4000,
    stock: 30,
    categoria: 'Endulzantes'
  };

  const created = await request(app)
    .post('/api/productos')
    .set('Authorization', `Bearer ${tokenAdmin}`)
    .send(nuevoProducto);

  const id = created.body.id;

  // 2. Actualizar el producto
  const cambios = {
    nombre: 'Azúcar Manuelita 1kg - Light',
    precio: 4500,
    stock: 25
  };

  const response = await request(app)
    .put(`/api/productos/${id}`)
    .set('Authorization', `Bearer ${tokenAdmin}`)
    .send(cambios);

  expect(response.statusCode).toBe(200); // o 204 si no devuelves el producto actualizado
  expect(response.body).toHaveProperty('id', id);
  expect(response.body.nombre).toBe(cambios.nombre);
  expect(Number(response.body.precio)).toBe(cambios.precio); // <- sin '+'
});


test('Debería eliminar un producto con DELETE /api/productos/:id', async () => {
  // 1. Crear un producto inicial
  const nuevoProducto = {
    nombre: 'Sal Refisal 500g',
    precio: 1500,
    stock: 80,
    categoria: 'Condimentos'
  };

  const created = await request(app)
    .post('/api/productos')
    .set('Authorization', `Bearer ${tokenAdmin}`)
    .send(nuevoProducto);

  const id = created.body.id;

  // 2. Eliminar el producto
  const response = await request(app)
    .delete(`/api/productos/${id}`)
    .set('Authorization', `Bearer ${tokenAdmin}`);

  expect(response.statusCode).toBe(200); // o 204 dependiendo de tu controlador

  // 3. Comprobar que ya no existe
  const getResponse = await request(app)
    .get(`/api/productos/${id}`)
    .set('Authorization', `Bearer ${tokenAdmin}`);

  expect(getResponse.statusCode).toBe(404);
});


  // 🧹 Cerrar conexión al final
  afterAll(async () => {
    await sequelize.close();
  });
});