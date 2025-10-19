/**
 * Helpers para tests - Funciones reutilizables
 * 
 * Este archivo centraliza funciones auxiliares que se usan
 * en múltiples archivos de test para evitar duplicación.
 */

const request = require('supertest');
const app = require('../app');

/**
 * Crea un usuario admin y retorna su token JWT
 * @returns {Promise<string>} Token de autenticación
 */
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

/**
 * Genera un objeto de producto base con valores por defecto
 * @param {Object} overrides - Valores a sobrescribir
 * @returns {Object} Objeto producto con campos requeridos
 */
function productoBase(overrides = {}) {
  return {
    nombre: 'Producto Test',
    precio: 1000,
    cantidad: 10,
    categoria: 'Test',
    ...overrides
  };
}

/**
 * Crea un producto usando el API con token de admin
 * @param {string} token - Token JWT de autenticación
 * @param {Object} overrides - Campos del producto a personalizar
 * @returns {Promise<Object>} Producto creado
 */
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
