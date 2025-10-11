module.exports = (rolesPermitidos = []) => {
  return (req, res, next) => {
    if (!req.usuario) return res.status(401).json({ mensaje: 'Autenticación requerida' });

    if (rolesPermitidos.length && !rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: 'No tienes permisos para realizar esta acción' });
    }

    next();
  };
};
