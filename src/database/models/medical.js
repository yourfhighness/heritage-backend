module.exports = (sequelize, DataTypes) => {
  const medical = sequelize.define('Medical', {
    doctorId: { type: DataTypes.INTEGER },
    farmerId: { type: DataTypes.INTEGER },
    cattleId: { type: DataTypes.INTEGER },
    appointmentId: { type: DataTypes.INTEGER },
    document: { type: DataTypes.STRING(1000) },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  medical.associate = (models) => {
    medical.belongsTo(models.Farmer, {
      foreignKey: 'farmerId',
      as: 'Farmer',
      onDelete: 'CASCADE',
    });
  };

  return medical;
};
