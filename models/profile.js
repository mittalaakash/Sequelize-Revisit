module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      name: DataTypes.STRING,
    },
    { timestamps: false },
  );

  return Profile;
};
