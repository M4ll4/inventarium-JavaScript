const express = require('express');
const request = require('supertest');
const errorHandler = require('../middleware/errorHandler');

describe('errorHandler middleware', () => {
  test('devuelve 500 y mensaje por defecto cuando no hay status/message', async () => {
    const app = express();

    app.get('/boom', () => {
      const err = new Error('placeholder'); // avoid passing an empty string to the constructor
      err.message = undefined; // ensure the handler falls back to the default message
      throw err;
    });
    app.use(errorHandler);

    const res = await request(app).get('/boom');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ mensaje: 'Error interno del servidor' });
  });

  test('respeta err.status y err.message si existen', async () => {
    const app = express();

    app.get('/custom', () => {
      const err = new Error('Fallo controlado');
      err.status = 418; // I'm a teapot
      throw err;
    });
    app.use(errorHandler);

    const res = await request(app).get('/custom');
    expect(res.statusCode).toBe(418);
    expect(res.body).toEqual({ mensaje: 'Fallo controlado' });
  });
});
