module.exports = (sequelize, DataTypes) => {
  const admins = sequelize.define('Admins', {
    profilePicture: { type: DataTypes.STRING(1000) },
    adminName: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    age: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  return admins;
};
