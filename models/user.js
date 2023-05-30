// const User = sequelize.define(
//   'User',
//   {
//     // Model attributes are defined here
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       //allowNull defaults to true
//     },
//     middleName: {
//       type: DataTypes.STRING,
//       //allowNull defaults to true
//     },
//   },
//   {
//     //other model options
//     tableName: 'users',
//     // timestamps: false,//remove updatedAt and createdAt both
//     updatedAt: true,
//     createdAt: false,
//   },
// );
module.exports = (sequelize, DataTypes, Model) => {
  class User extends Model {}

  User.init(
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: 'sharma',
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'User', // We need to choose the model name
      tableName: 'users',
      //     // timestamps: false,//remove updatedAt and createdAt both
      updatedAt: true,
      createdAt: false,
    },
  );

  return User;

  // `sequelize.define` also returns the model
  // console.log(User === sequelize.models.User); // true
};
