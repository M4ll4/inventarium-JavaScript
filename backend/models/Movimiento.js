const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Producto = require('./Producto');
const Usuario = require('./Usuario');

const Movimiento = sequelize.define('Movimiento', {
  tipo: DataTypes.STRING, // entrada o salida
  cantidad: DataTypes.INTEGER,
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

Movimiento.belongsTo(Producto);
Movimiento.belongsTo(Usuario);

module.exports = Movimiento;