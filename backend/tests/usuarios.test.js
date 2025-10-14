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
      rol: 'admin'
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

  afterAll(async () => {
    await sequelize.close();
  });

});
