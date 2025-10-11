const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: DataTypes.TEXT,
  categoria: DataTypes.STRING,
  cantidad: { type: DataTypes.INTEGER, defaultValue: 0 },
  precio: DataTypes.DECIMAL(10, 2),
  proveedor: DataTypes.STRING,
  fecha_ingreso: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
});

module.exports = Producto;