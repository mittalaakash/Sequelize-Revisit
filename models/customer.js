module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      username: DataTypes.STRING,
      points: DataTypes.INTEGER,
    },
    { timestamps: false },
  );

  return Customer;
};
