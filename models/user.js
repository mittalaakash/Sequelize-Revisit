const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      //allowNull defaults to true
    },
    middleName: {
      type: DataTypes.STRING,
      //allowNull defaults to true
    },
  },
  {
    //other model options
    tableName: 'users',
    // timestamps: false,//remove updatedAt and createdAt both
    updatedAt: true,
    createdAt: false,
  },
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = User;
