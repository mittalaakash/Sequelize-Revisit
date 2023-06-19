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

const User_Profile = sequelize.define(
  'User_Profile',
  { selfGranted: DataTypes.BOOLEAN },
  { timestamps: false },
);

db.user = require('./user')(sequelize, DataTypes, Model);
db.contact = require('./contact')(sequelize, DataTypes);
db.education = require('./education')(sequelize, DataTypes);
db.customer = require('./customer')(sequelize, DataTypes);
db.profile = require('./profile')(sequelize, DataTypes);

// db.userContact = require('./userContacts')(
//   sequelize,
//   DataTypes,s
//   db.user,
//   db.contact,
// );

db.user.hasOne(db.contact, { foreignKey: 'userId', as: 'contactDetails' });
// db.user.hasMany(db.contact, { foreignKey: 'userId', as: 'contactDetails' });
db.contact.belongsTo(db.user, {
  foreignKey: 'userId',
  as: 'users',
  allowNull: false,
});
// db.contact.hasOne(db.education, { foreignKey: 'contactId' });
// db.education.belongsTo(db.contact, { foreignKey: 'contactId' });

// db.customer.belongsToMany(db.profile, { through: 'User_Profile' });
// db.profile.belongsToMany(db.customer, { through: 'User_Profile' });

// db.user.belongsToMany(db.contact, {
//   through: 'user_contacts',
//   // foreignKey: 'userId',
// });
// db.contact.belongsToMany(db.user, {
//   through: 'user_contacts',
//   // foreignKey: 'contactId',
// });
// db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(() => {
//   db.sequelize.sync({ force: true });
// });
// db.sequelize.drop();

db.sequelize
  .query('SET FOREIGN_KEY_CHECKS = 0')
  .then(function () {
    return db.sequelize.sync({ force: false });
  })
  .then(function () {
    return db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  })
  .then(
    function () {
      console.log('Database synchronised.');
    },
    function (err) {
      console.log(err);
    },
  );

module.exports = db;
