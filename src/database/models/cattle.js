module.exports = (sequelize, DataTypes) => {
  const Cattle = sequelize.define('Cattle', {
    profilePicture: { type: DataTypes.STRING },
    farmerId: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING },
    cattle: { type: DataTypes.STRING },
    cattleUID: { type: DataTypes.STRING },
    cattleName: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    age: { type: DataTypes.DATE },
    breed: { type: DataTypes.STRING },
    weight: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  Cattle.associate = (models) => {
    Cattle.hasMany(models.Milking, {
      foreignKey: 'cattleId',
      as: 'Milking',
      onDelete: 'CASCADE',
    });

    Cattle.hasMany(models.Appointment, {
      foreignKey: 'cattleId',
      as: 'Appointment',
      onDelete: 'CASCADE',
    });

    Cattle.belongsTo(models.Farmer, {
      foreignKey: 'farmerId',
      as: 'Farmer',
      onDelete: 'CASCADE',
    });
  };

  return Cattle;
};
