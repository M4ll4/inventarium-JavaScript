const request = require('supertest');
const app = require('../app');

async function crearTokenAdmin() {
  await request(app)
    .post('/api/usuarios/register')
    .send({
      nombre: 'Admin Test',
      email: 'admin@tdd.com',
      contraseña: '123456',
      rol: 'admin'
    });

  const loginResponse = await request(app)
    .post('/api/usuarios/login')
    .send({
      email: 'admin@tdd.com',
      contraseña: '123456'
    });

  return loginResponse.body.token;
}

function productoBase(overrides = {}) {
  return {
    nombre: 'Producto Test',
    precio: 1000,
    cantidad: 10,
    categoria: 'Test',
    ...overrides
  };
}

async function crearProducto(token, overrides = {}) {
  const payload = productoBase(overrides);
  const response = await request(app)
    .post('/api/productos')
    .set('Authorization', `Bearer ${token}`)
    .send(payload);
  return response.body;
}

module.exports = {
  crearTokenAdmin,
  productoBase,
  crearProducto,
};
