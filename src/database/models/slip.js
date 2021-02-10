module.exports = (sequelize, DataTypes) => {
  const Slip = sequelize.define('Slip', {
    cattleId: { type: DataTypes.INTEGER },
    shift: { type: DataTypes.STRING },
    quantity: { type: DataTypes.INTEGER },
    fat: { type: DataTypes.STRING },
    snf: { type: DataTypes.STRING },
    amount: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  Slip.associate = (models) => {
    Slip.belongsTo(models.Milking, {
      foreignKey: 'cattleId',
      as: 'Cattle',
      onDelete: 'CASCADE',
    });
  };

  return Slip;
};
