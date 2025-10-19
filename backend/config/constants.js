/**
 * Constantes y configuración centralizada de la aplicación
 */

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';
const JWT_EXPIRES_IN = '2h';

const ROLES = {
  ADMIN: 'admin',
  EMPLEADO: 'empleado',
  USUARIO: 'usuario'
};

const MAX_ADMINS = 3;

module.exports = {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ROLES,
  MAX_ADMINS
};
