// Middleware global para manejo de errores
function errorHandler(err, req, res, next) {
  // Evitar romper si err no es un objeto de error bien formado
  const status = err?.status || 500;
  const message = err?.message || 'Error interno del servidor';

  // Logueo acotado para no exponer stack en prod (Sonar: manejar excepciones explícitamente)
  // eslint-disable-next-line no-console
  console.error('Error:', message);

  if (res.headersSent) {
    return next(err);
  }
  return res.status(status).json({ mensaje: message });
}

module.exports = errorHandler;
