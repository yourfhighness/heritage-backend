module.exports = (sequelize, DataTypes) => {
  const semiVerifiedFarmer = sequelize.define('SemiVerifiedFarmer', {
    profilePicture: { type: DataTypes.STRING(1000) },
    status: { type: DataTypes.STRING },
    farmerName: { type: DataTypes.STRING },
    nomineeName: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    age: { type: DataTypes.DATE },
    occupation: { type: DataTypes.STRING },
    monthlyIncome: { type: DataTypes.STRING },
    cardNo: { type: DataTypes.STRING },
    enrollmentID: { type: DataTypes.STRING },
    paymentDone: { type: DataTypes.DATE },
    phone: { type: DataTypes.STRING },
    regionName: { type: DataTypes.STRING },
    unitName: { type: DataTypes.STRING },
    mccName: { type: DataTypes.STRING },
    mccCode: { type: DataTypes.STRING },
    pinCode: { type: DataTypes.STRING },
    userCode: { type: DataTypes.STRING },
    isVerified: { type: DataTypes.BOOLEAN },
    password: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  return semiVerifiedFarmer;
};
