const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded; // guarda los datos del usuario (id, rol)
    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Auth token verification failed:', error && error.message);
    return res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
}

module.exports = authMiddleware;
