const { Sequelize } = require('sequelize');
require('dotenv').config({ quiet: true });

let sequelize;

if (process.env.NODE_ENV === 'test') {
  // Usar SQLite en memoria para pruebas (forma recomendada sin URL deprecada)
  sequelize = new Sequelize({ dialect: 'sqlite', storage: ':memory:', logging: false });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      port: process.env.DB_PORT,
      logging: false,
    }
  );
}

module.exports = sequelize;