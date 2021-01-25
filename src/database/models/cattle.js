const cattleDefinition = (sequelize, DataTypes) => {
  const Cattle = sequelize.define('Cattle', {
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

  return Cattle;
};

export default cattleDefinition;
