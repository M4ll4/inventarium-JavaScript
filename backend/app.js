const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

// Importar modelos
require('./models/Producto');
require('./models/Usuario');
require('./models/Movimiento');
require('./models/Pedido');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));

// Ruta base
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente 🚀');
});

// Middleware global de manejo de errores
app.use(require('./middleware/errorHandler'));

// Exportar la app (sin iniciar el servidor)
module.exports = app;
