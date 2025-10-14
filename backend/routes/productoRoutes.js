const express = require('express');
const router = express.Router();
const { listarProductos, crearProducto, actualizarProducto, eliminarProducto, obtenerProductoPorId } = require('../controllers/productoController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const validateProducto = require('../middleware/validateProducto');

router.get('/', listarProductos);
router.get('/:id', auth, obtenerProductoPorId);
router.post('/', auth, role(['admin']), validateProducto, crearProducto);
router.put('/:id', auth, role(['admin']), validateProducto, actualizarProducto);
router.delete('/:id', auth, role(['admin']), eliminarProducto);



module.exports = router;