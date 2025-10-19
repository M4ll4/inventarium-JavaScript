// Middleware de validación para productos usando Joi
const Joi = require('joi');

const productoSchemaPOST = Joi.object({
  nombre: Joi.string().trim().min(1).required(),
  precio: Joi.number().min(0).required(),
  cantidad: Joi.number().integer().min(0).required(),
  categoria: Joi.string().trim().min(1).required(),
  descripcion: Joi.string().allow('').optional(),
  proveedor: Joi.string().allow('').optional(),
  fecha_ingreso: Joi.date().optional()
});

const productoSchemaPUT = Joi.object({
  nombre: Joi.string().trim().min(1),
  precio: Joi.number().min(0),
  cantidad: Joi.number().integer().min(0),
  categoria: Joi.string().trim().min(1),
  descripcion: Joi.string().allow(''),
  proveedor: Joi.string().allow(''),
  fecha_ingreso: Joi.date()
}).min(1); // Al menos un campo

function validateProducto(req, res, next) {
  let schema;
  if (req.method === 'POST') {
    schema = productoSchemaPOST;
  } else if (req.method === 'PUT') {
    schema = productoSchemaPUT;
  } else {
    return next();
  }
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ mensaje: error.details[0].message });
  }
  return next();
}

module.exports = validateProducto;
