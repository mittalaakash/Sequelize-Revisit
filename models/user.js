// module.exports = (sequelize, DataTypes, Model) => {
//   return sequelize.define(
//     'User',
//     {
//       // Model attributes are defined here
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           isAlpha: true,
//         },
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         //allowNull defaults to true
//       },
//       middleName: {
//         type: DataTypes.STRING,
//         //allowNull defaults to true
//       },
//     },
//     {
//       //other model options
//       tableName: 'users',
//       // timestamps: false,//remove updatedAt and createdAt both
//       updatedAt: true,
//       createdAt: false,
//     },
//   );
// };
module.exports = (sequelize, DataTypes, Model) => {
  class User extends Model {}

  User.init(
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        get() {
          //getter
          const rawValue = this.getDataValue('firstName');
          return rawValue ? rawValue.toUpperCase() : null;
        },
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: 'sharma',
        //setter
        set(value) {
          this.setDataValue('lastName', `${value} singh`);
        },

        // allowNull defaults to true
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.firstName + ' ' + this.lastName;
        },
      },
      age: {
        type: DataTypes.INTEGER,
        defaultValue: 18,
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
