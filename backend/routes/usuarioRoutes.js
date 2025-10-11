const express = require('express');
const router = express.Router();
const { registrarUsuario, login, listarUsuarios } = require('../controllers/usuarioController');

router.post('/register', registrarUsuario);
router.post('/login', login);
router.get('/', listarUsuarios);

module.exports = router;
