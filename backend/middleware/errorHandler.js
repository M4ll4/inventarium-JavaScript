// Middleware global para manejo de errores
module.exports = (err, req, res, next) => {
  console.error('Error:', err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({ mensaje: err.message || 'Error interno del servidor' });
};
