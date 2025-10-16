const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');

describe('Pruebas del módulo de usuarios', () => {

  let token = "";
  let userId = "";

  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sincroniza modelos y crea tablas
    // Crear usuario admin para pruebas de login
    await request(app)
      .post('/api/usuarios/register')
      .send({
        nombre: 'Admin TDD',
        email: 'sebastian@correo.com',
        contraseña: '123456',
        rol: 'admin'
      });
  });

  test('Debería registrar un nuevo usuario con POST /api/usuarios/register', async () => {
    const nuevoUsuario = {
      nombre: 'Tester User',
      email: `tester${Date.now()}@correo.com`, // Para evitar duplicados
      contraseña: '123456',
      rol: 'empleado'
    };

    const response = await request(app)
      .post('/api/usuarios/register')
      .send(nuevoUsuario);

  expect(response.statusCode).toBe(201);
  expect(response.body.usuario).toHaveProperty('id');

  userId = response.body.usuario.id;
  });

  test('Debería permitir login con datos correctos en POST /api/usuarios/login', async () => {
    const response = await request(app)
      .post('/api/usuarios/login')
      .send({
        email: 'sebastian@correo.com',
        contraseña: '123456'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');

    token = response.body.token;
  });

  test('Debería rechazar login con datos incorrectos', async () => {
    const response = await request(app)
      .post('/api/usuarios/login')
      .send({
        email: 'sebastian@correo.com',
        contraseña: 'contramal'
      });

    expect(response.statusCode).toBe(401);
  });

  test('Debería obtener un usuario por ID con GET /api/usuarios/:id', async () => {
    const response = await request(app)
      .get(`/api/usuarios/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
  });


  test('Un usuario con rol "usuario" no puede crear, editar ni eliminar productos', async () => {
    // Registrar usuario con rol "usuario"
    const responseReg = await request(app)
      .post('/api/usuarios/register')
      .send({
        nombre: 'Solo Consulta',
        email: `consulta${Date.now()}@correo.com`,
        contraseña: '123456',
        rol: 'usuario'
      });
    expect(responseReg.statusCode).toBe(201);

    // Login para obtener token
    const responseLogin = await request(app)
      .post('/api/usuarios/login')
      .send({
        email: responseReg.body.usuario.email,
        contraseña: '123456'
      });
    expect(responseLogin.statusCode).toBe(200);
    const tokenUsuario = responseLogin.body.token;

    // Intentar crear producto
    const responseCreate = await request(app)
      .post('/api/productos')
      .set('Authorization', `Bearer ${tokenUsuario}`)
      .send({ nombre: 'No permitido', precio: 10, cantidad: 1, categoria: 'Test' });
    expect(responseCreate.statusCode).toBe(403);
    expect(responseCreate.body).toHaveProperty('mensaje');

    // Intentar editar producto (id 1)
    const responseEdit = await request(app)
      .put('/api/productos/1')
      .set('Authorization', `Bearer ${tokenUsuario}`)
      .send({ nombre: 'Editado' });
    expect(responseEdit.statusCode).toBe(403);
    expect(responseEdit.body).toHaveProperty('mensaje');

    // Intentar eliminar producto (id 1)
    const responseDelete = await request(app)
      .delete('/api/productos/1')
      .set('Authorization', `Bearer ${tokenUsuario}`);
    expect(responseDelete.statusCode).toBe(403);
    expect(responseDelete.body).toHaveProperty('mensaje');
  });


  test('Debería registrar un usuario con rol "usuario" y permitir login', async () => {
    const email = `usuario${Date.now()}@correo.com`;
    const responseReg = await request(app)
      .post('/api/usuarios/register')
      .send({
        nombre: 'Usuario Consulta',
        email,
        contraseña: '123456',
        rol: 'usuario'
      });
    expect(responseReg.statusCode).toBe(201);
    expect(responseReg.body.usuario.rol).toBe('usuario');

    // Login y verificar rol
    const responseLogin = await request(app)
      .post('/api/usuarios/login')
      .send({ email, contraseña: '123456' });
    expect(responseLogin.statusCode).toBe(200);
    expect(responseLogin.body.rol).toBe('usuario');
  });

  test('No se pueden registrar más de 3 admins por ejecución', async () => {
    // Ya hay 1 admin creado en beforeAll, crear el segundo
    const response2 = await request(app)
      .post('/api/usuarios/register')
      .send({
        nombre: 'Admin2',
        email: `admin2_${Date.now()}@correo.com`,
        contraseña: '123456',
        rol: 'admin'
      });
    expect(response2.statusCode).toBe(201);
    expect(response2.body.usuario.rol).toBe('admin');

    // Crear el tercer admin (último permitido)
    const response3 = await request(app)
      .post('/api/usuarios/register')
      .send({
        nombre: 'Admin3',
        email: `admin3_${Date.now()}@correo.com`,
        contraseña: '123456',
        rol: 'admin'
      });
    expect(response3.statusCode).toBe(201);
    expect(response3.body.usuario.rol).toBe('admin');

    // Intentar registrar un cuarto admin (debe fallar)
    const responseFail = await request(app)
      .post('/api/usuarios/register')
      .send({
        nombre: 'Admin4',
        email: `admin4_${Date.now()}@correo.com`,
        contraseña: '123456',
        rol: 'admin'
      });
    expect(responseFail.statusCode).toBe(400);
    expect(responseFail.body).toHaveProperty('mensaje');
    expect(responseFail.body.mensaje).toMatch(/máximo 3 admins/i);
  });

  afterAll(async () => {
    await sequelize.close();
  });

});
