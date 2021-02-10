module.exports = (sequelize, DataTypes) => {
  const Farmer = sequelize.define('Farmer', {
    profilePicture: { type: DataTypes.STRING },
    farmerName: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    age: { type: DataTypes.DATE },
    phone: { type: DataTypes.STRING },
    unitName: { type: DataTypes.STRING },
    mccName: { type: DataTypes.STRING },
    mccCode: { type: DataTypes.STRING },
    userCode: { type: DataTypes.STRING },
    isVerified: { type: DataTypes.BOOLEAN },
    password: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  return Farmer;
};
