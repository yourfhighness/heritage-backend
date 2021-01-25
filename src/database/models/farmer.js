const farmerDefinition = (sequelize, DataTypes) => {
  const Farmer = sequelize.define('Farmer', {
    username: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    locationId: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  return Farmer;
};

export default farmerDefinition;
