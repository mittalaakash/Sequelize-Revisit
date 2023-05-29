const { Sequelize } = require('sequelize');

//connection for pgsql
// const sequelize = new Sequelize('postgres', 'postgres', 'hello', {
//   host: 'localhost',
//   port: 5433,
//   dialect: 'postgres',
// });

//connection for mysql
const sequelize = new Sequelize('world', 'root', 'admin', {
  host: 'localhost',
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
