const express = require('express');
const router = express.Router();
const { registrarUsuario, login, listarUsuarios, obtenerUsuarioPorId } = require('../controllers/usuarioController');


router.post('/register', registrarUsuario);
router.post('/login', login);
router.get('/', listarUsuarios);
router.get('/:id', obtenerUsuarioPorId);

module.exports = router;
