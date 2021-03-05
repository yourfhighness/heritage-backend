module.exports = (sequelize, DataTypes) => {
  const FarmerSession = sequelize.define('FarmerSession', {
    farmerId: { type: DataTypes.INTEGER },
    farmerName: { type: DataTypes.STRING },
    session: { type: DataTypes.STRING(1000) },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  return FarmerSession;
};
