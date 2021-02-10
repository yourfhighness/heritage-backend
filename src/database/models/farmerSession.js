const FarmerSessionDefinition = (sequelize, DataTypes) => {
  const FarmerSession = sequelize.define('FarmerSession', {
    farmerId: { type: DataTypes.INTEGER },
    farmerName: { type: DataTypes.STRING },
    session: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  return FarmerSession;
};

export default FarmerSessionDefinition;
