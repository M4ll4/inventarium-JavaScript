
const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');
const { crearTokenAdmin, productoBase, crearProducto } = require('./helpers');

describe('Pruebas del módulo de productos', () => {
  let tokenAdmin = '';

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    tokenAdmin = await crearTokenAdmin();
  });

  // CRUD primero
  test('GET /api/productos debe responder 200 y array', async () => {
    const response = await request(app)
      .get('/api/productos')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/productos debe crear un producto', async () => {
    const nuevo = productoBase({ nombre: 'Producto A' });
    const response = await request(app)
      .post('/api/productos')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(nuevo);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nombre).toBe(nuevo.nombre);
  });

  test('GET /api/productos/:id debe devolver el producto', async () => {
    const creado = await crearProducto(tokenAdmin, { nombre: 'Producto B', precio: 2000, cantidad: 5 });
    const id = creado.id;
    const response = await request(app)
      .get(`/api/productos/${id}`)
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', id);
  });

  test('PUT /api/productos/:id debe actualizar el producto', async () => {
    const creado = await crearProducto(tokenAdmin, { nombre: 'Producto C', precio: 3000, cantidad: 7 });
    const id = creado.id;
    const cambios = { nombre: 'Producto C+', precio: 3500, cantidad: 9 };
    const response = await request(app)
      .put(`/api/productos/${id}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(cambios);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', id);
    expect(response.body.nombre).toBe(cambios.nombre);
    expect(Number(response.body.precio)).toBe(cambios.precio);
  });

  test('DELETE /api/productos/:id debe eliminar y luego 404 al consultar', async () => {
    const creado = await crearProducto(tokenAdmin, { nombre: 'Producto D', precio: 4000, cantidad: 3 });
    const id = creado.id;
    const del = await request(app)
      .delete(`/api/productos/${id}`)
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(del.statusCode).toBe(200);
    const getDeleted = await request(app)
      .get(`/api/productos/${id}`)
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(getDeleted.statusCode).toBe(404);
  });

  // Validaciones debajo
  test('No debería crear un producto con precio negativo', async () => {
    const payload = { nombre: 'Negativo Precio', precio: -1, cantidad: 1, categoria: 'Test' };
    const response = await request(app)
      .post('/api/productos')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(payload);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('mensaje');
  });

  test('No debería crear un producto con cantidad negativa', async () => {
    const payload = { nombre: 'Negativo Cantidad', precio: 10, cantidad: -5, categoria: 'Test' };
    const response = await request(app)
      .post('/api/productos')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(payload);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('mensaje');
  });

  test('No debería crear un producto sin nombre (campo requerido)', async () => {
    const payload = { precio: 1000, cantidad: 1, categoria: 'Test' };
    const response = await request(app)
      .post('/api/productos')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(payload);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('mensaje');
  });

  test('Debería responder 404 al obtener un producto inexistente', async () => {
    const inexistenteId = 999999;
    const response = await request(app)
      .get(`/api/productos/${inexistenteId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('mensaje');
  });

  test('Debería responder 404 al actualizar un producto inexistente', async () => {
    const inexistenteId = 999999;
    const response = await request(app)
      .put(`/api/productos/${inexistenteId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ nombre: 'X', precio: 1 });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('mensaje');
  });

  test('Debería responder 404 al eliminar un producto inexistente', async () => {
    const inexistenteId = 999999;
    const response = await request(app)
      .delete(`/api/productos/${inexistenteId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('mensaje');
  });

  // Seguridad
  test('Debería rechazar crear producto sin token', async () => {
    const payload = { nombre: 'S/T', precio: 100, cantidad: 1, categoria: 'Test' };
    const response = await request(app)
      .post('/api/productos')
      // sin Authorization
      .send(payload);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('mensaje');
  });

  test('Debería rechazar actualizar producto sin token', async () => {
    // Creamos uno con token para tener un id válido
    const creado = await request(app)
      .post('/api/productos')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ nombre: 'Con token', precio: 10, cantidad: 1, categoria: 'Test' });

    const id = creado.body.id;
    // Intento de actualizar sin token
    const response = await request(app)
      .put(`/api/productos/${id}`)
      .send({ nombre: 'Sin token' });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('mensaje');
  });

  test('Debería rechazar eliminar producto sin token', async () => {
    // Creamos uno con token para tener un id válido
    const creado = await request(app)
      .post('/api/productos')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ nombre: 'Para eliminar', precio: 10, cantidad: 1, categoria: 'Test' });

    const id = creado.body.id;
    // Intento de eliminar sin token
    const response = await request(app)
      .delete(`/api/productos/${id}`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('mensaje');
  });

  test('Debería responder 403 con token inválido', async () => {
    const creado = await request(app)
      .post('/api/productos')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ nombre: 'Para token invalido', precio: 10, cantidad: 1, categoria: 'Test' });
    const id = creado.body.id;
    const response = await request(app)
      .get(`/api/productos/${id}`)
      .set('Authorization', 'Bearer token-falso');
    expect(response.statusCode).toBe(403);
  });

  // Limpieza al final
  afterAll(async () => {
    await sequelize.close();
  });
});