module.exports = (sequelize, DataTypes) => {
  const Slip = sequelize.define('Slip', {
    farmerId: { type: DataTypes.INTEGER },
    cattleId: { type: DataTypes.INTEGER },
    issueDate: { type: DataTypes.DATE },
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
