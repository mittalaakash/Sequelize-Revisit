const { Sequelize, DataTypes, Model } = require('sequelize');

//connection for pgsql
// const sequelize = new Sequelize('employeeDB', 'postgres', 'hello', {
//   host: 'localhost',
//   port: 5433,
//   dialect: 'postgres',
// });

//connection for mysql
const sequelize = new Sequelize('employeeDB', 'root', 'admin', {
  host: 'localhost',
  logging: false,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contact = require('./contact')(sequelize, DataTypes);
db.user = require('./user')(sequelize, DataTypes, Model);

db.sequelize.sync({ force: true });

module.exports = db;
