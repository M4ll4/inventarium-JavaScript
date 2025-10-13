// Middleware de validación para productos usando Joi
const Joi = require('joi');

const productoSchema = Joi.object({
  nombre: Joi.string().trim().min(1).required(),
  precio: Joi.number().min(0).required(),
  cantidad: Joi.number().integer().min(0).required(),
  categoria: Joi.string().trim().min(1).required(),
  descripcion: Joi.string().allow('').optional(),
  proveedor: Joi.string().allow('').optional(),
  fecha_ingreso: Joi.date().optional()
});

module.exports = (req, res, next) => {
  const { error } = productoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ mensaje: error.details[0].message });
  }
  next();
};
