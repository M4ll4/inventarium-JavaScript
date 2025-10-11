const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Producto = require('./Producto');

const Pedido = sequelize.define('Pedido', {
  cantidad: DataTypes.INTEGER,
  estado: { type: DataTypes.STRING, defaultValue: 'pendiente' },
  fecha_creacion: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
});

Pedido.belongsTo(Producto);

module.exports = Pedido;