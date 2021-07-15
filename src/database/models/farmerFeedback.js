module.exports = (sequelize, DataTypes) => {
  const farmerFeedback = sequelize.define('FarmerFeedback', {
    farmerId: { type: DataTypes.INTEGER },
    feedback: { type: DataTypes.STRING(1000) },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  farmerFeedback.associate = (models) => {
    farmerFeedback.belongsTo(models.Farmer, {
      foreignKey: 'farmerId',
      as: 'Farmer',
      onDelete: 'CASCADE',
    });
  };

  return farmerFeedback;
};
