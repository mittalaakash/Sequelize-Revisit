module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'Contact',
    {
      // Model attributes are defined here
      permanentAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currentAddress: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      // tableName: 'contacts',
      // freezeTableName: true,
      // Other model options go here
    },
  );

  // `sequelize.define` also returns the model
  // console.log(Contact === sequelize.models.Contact); // true

  return Contact;
};
