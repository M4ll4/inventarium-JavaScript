const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña, rol } = req.body;

    // Verificar si ya existe el usuario
    const existeUsuario = await Usuario.findOne({ where: { email } });
    if (existeUsuario) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Crear usuario (la contraseña se encripta automáticamente por el hook)
    const nuevoUsuario = await Usuario.create({ nombre, email, contraseña, rol });
    res.status(201).json({ mensaje: 'Usuario registrado correctamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Comparar contraseñas
    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET || 'secreto_super_seguro',
      { expiresIn: '2h' }
    );

    res.json({
     mensaje: 'Inicio de sesión exitoso',
     token,
     rol: usuario.rol,
     usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email
  }
});

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ mensaje: 'Error en el inicio de sesión' });
  }
};

// Listar todos los usuarios (solo para pruebas)
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id', 'nombre', 'email', 'rol', 'createdAt']
    });
    res.json(usuarios);
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};
