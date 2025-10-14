const Producto = require('../models/Producto');

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
  try {
    // Validación de negocio mínima por TDD: no permitir valores negativos.
    // Nota: se implementa en el controlador para alcanzar rápidamente el caso de prueba.
    // Si más adelante se desea reforzar a nivel de datos, se puede mover al modelo con validaciones Sequelize.
    const { nombre, precio, cantidad } = req.body || {};
    // Campo requerido: nombre
    if (nombre == null || String(nombre).trim() === '') {
      return res.status(400).json({ mensaje: 'El nombre es requerido' });
    }
    if (precio !== undefined && Number(precio) < 0) {
      return res.status(400).json({ mensaje: 'El precio no puede ser negativo' });
    }
    if (cantidad !== undefined && Number(cantidad) < 0) {
      return res.status(400).json({ mensaje: 'La cantidad no puede ser negativa' });
    }
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ mensaje: 'Error al registrar producto' });
  }
};

// Obtener todos los productos
exports.listarProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    console.error('Error al listar productos:', error);
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
};

// Actualizar un producto existente
exports.actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    // Validación de negocio mínima por TDD: no permitir valores negativos.
    const { precio, cantidad } = req.body || {};
    if (precio !== undefined && Number(precio) < 0) {
      return res.status(400).json({ mensaje: 'El precio no puede ser negativo' });
    }
    if (cantidad !== undefined && Number(cantidad) < 0) {
      return res.status(400).json({ mensaje: 'La cantidad no puede ser negativa' });
    }
    const [actualizados] = await Producto.update(req.body, {
      where: { id }
    });

    if (actualizados === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    const productoActualizado = await Producto.findByPk(id);
    res.json(productoActualizado);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ mensaje: 'Error al actualizar producto' });
  }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminados = await Producto.destroy({ where: { id } });

    if (eliminados === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ mensaje: 'Error al eliminar producto' });
  }
};

// Obtener un producto por ID
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ mensaje: 'Error al obtener producto' });
  }
};
