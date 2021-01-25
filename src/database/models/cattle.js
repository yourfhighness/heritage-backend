const farmerDefinition = (sequelize, DataTypes) => {
  const Farmer = sequelize.define('Farmer', {
    farmerId: { type: DataTypes.INTEGER },
    cattle: { type: DataTypes.STRING },
    cattleUID: { type: DataTypes.STRING },
    cattleName: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    age: { type: DataTypes.DATE },
    weight: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  return Farmer;
};

export default farmerDefinition;
