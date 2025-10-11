const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    defaultValue: 'empleado' // o "admin"
  }
}, {
  timestamps: true,
  hooks: {
    // 🔹 Antes de crear o actualizar, encriptamos la contraseña
    beforeCreate: async (usuario) => {
      const salt = await bcrypt.genSalt(10);
      usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt);
    },
    beforeUpdate: async (usuario) => {
      if (usuario.changed('contraseña')) {
        const salt = await bcrypt.genSalt(10);
        usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt);
      }
    }
  }
});

module.exports = Usuario;
