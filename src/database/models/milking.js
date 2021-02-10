module.exports = (sequelize, DataTypes) => {
  const Milking = sequelize.define('Milking', {
    cattleId: { type: DataTypes.INTEGER },
    milkProduction: { type: DataTypes.INTEGER },
    fatInMilk: { type: DataTypes.INTEGER },
    pregnantMonth: { type: DataTypes.INTEGER },
    LactationNumber: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  Milking.associate = (models) => {
    Milking.belongsTo(models.Cattle, {
      foreignKey: 'cattleId',
      as: 'Cattle',
      onDelete: 'CASCADE',
    });
  };

  return Milking;
};
