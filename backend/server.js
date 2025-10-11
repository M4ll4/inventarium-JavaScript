const app = require('./app');
const sequelize = require('./config/database');

sequelize.sync()
  .then(() => {
    console.log('📦 Base de datos sincronizada');
    app.listen(4000, () => {
      console.log('🚀 Servidor corriendo en puerto 4000');
    });
  })
  .catch((err) => {
    console.error('❌ Error al sincronizar la base de datos:', err);
  });
