const express = require('express');
const cors = require('cors');
require('dotenv').config({ quiet: true });
const sequelize = require('./config/database');

// Importar modelos
require('./models/Producto');
require('./models/Usuario');

const app = express();

// Seguridad básica: ocultar cabecera X-Powered-By para no revelar versión de Express
app.disable('x-powered-by');

// Middleware
// CORS con lista blanca configurable por variable de entorno CORS_ORIGINS (separada por comas)
const parsedEnvOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const defaultDevOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
const whitelist = parsedEnvOrigins.length
  ? parsedEnvOrigins
  : (process.env.NODE_ENV === 'production' ? [] : defaultDevOrigins);

const corsOptions = {
  origin: (origin, callback) => {
    // Permitir peticiones sin header Origin (ej. herramientas tipo curl) o desde orígenes en lista blanca
    if (!origin || whitelist.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origen no permitido por CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
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
