module.exports = (sequelize, DataTypes) => {
  const farmer = sequelize.define('Farmer', {
    profilePicture: { type: DataTypes.STRING(1000) },
    role: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    steps: { type: DataTypes.STRING },
    appVersion: { type: DataTypes.STRING },
    farmerName: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    age: { type: DataTypes.DATE },
    phone: { type: DataTypes.STRING },
    userCode: { type: DataTypes.STRING },
    pinCode: { type: DataTypes.STRING },
    unitCode: { type: DataTypes.STRING },
    mccCode: { type: DataTypes.STRING },
    mccMobile: { type: DataTypes.STRING },
    plateCode: { type: DataTypes.STRING },
    regionName: { type: DataTypes.STRING },
    unitName: { type: DataTypes.STRING },
    mccName: { type: DataTypes.STRING },
    plateName: { type: DataTypes.STRING },
    stateName: { type: DataTypes.STRING },
    districtName: { type: DataTypes.STRING },
    mendalName: { type: DataTypes.STRING },
    panchayatName: { type: DataTypes.STRING },
    villageName: { type: DataTypes.STRING },
    isVerified: { type: DataTypes.BOOLEAN },
    password: { type: DataTypes.STRING },
    firebaseToken: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  farmer.associate = (models) => {
    farmer.hasMany(models.Appointment, {
      foreignKey: 'farmerId',
      as: 'Appointment',
      onDelete: 'CASCADE',
    });

    farmer.hasMany(models.Cattle, {
      foreignKey: 'farmerId',
      as: 'Cattle',
      onDelete: 'CASCADE',
    });

    farmer.hasMany(models.Medical, {
      foreignKey: 'farmerId',
      as: 'Medical',
      onDelete: 'CASCADE',
    });
  };

  return farmer;
};
