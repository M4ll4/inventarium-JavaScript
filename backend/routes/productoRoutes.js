const express = require('express');
const router = express.Router();
const { listarProductos, crearProducto, actualizarProducto, eliminarProducto, obtenerProductoPorId } = require('../controllers/productoController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.get('/', listarProductos);
router.get('/:id', auth, obtenerProductoPorId);
router.post('/', auth, role(['admin']), crearProducto);
router.put('/:id', auth, role(['admin']), actualizarProducto);
router.delete('/:id', auth, role(['admin']), eliminarProducto);



module.exports = router;