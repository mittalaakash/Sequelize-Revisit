const { Sequelize, DataTypes, Model } = require('sequelize');

// // connection for pgsql
// const sequelize = new Sequelize('employeeDB', 'postgres', 'hello', {
//   host: 'localhost',
//   port: 5433,
//   logging: false,
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

db.user = require('./user')(sequelize, DataTypes, Model);
db.contact = require('./contact')(sequelize, DataTypes);
db.userContact = require('./userContacts')(
  sequelize,
  DataTypes,
  db.user,
  db.contact,
);

// db.user.hasOne(db.contact, { foreignKey: 'userId', as: 'contactDetails' });
db.user.hasMany(db.contact, { foreignKey: 'userId', as: 'contactDetails' });
db.contact.belongsTo(db.user, { foreignKey: 'userId', as: 'userDetails' });

db.user.belongsToMany(db.contact, {
  through: 'user_contacts',
  foreignKey: 'userId',
});
db.contact.belongsToMany(db.user, {
  through: 'user_contacts',
  // foreignKey: 'contactId',
});

db.sequelize.sync({ force: false });
// db.sequelize.drop();

module.exports = db;
