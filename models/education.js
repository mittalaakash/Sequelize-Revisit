module.exports = (sequelize, DataTypes) => {
  const Education = sequelize.define(
    'Education',
    {
      // Model attributes are defined here
      class: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      grade: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      passingYear: {
        type: DataTypes.INTEGER,
      },
      contactId: {
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

  return Education;
};
