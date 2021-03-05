module.exports = (sequelize, DataTypes) => {
  const farmer = sequelize.define('Farmer', {
    profilePicture: { type: DataTypes.STRING(1000) },
    status: { type: DataTypes.STRING },
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
