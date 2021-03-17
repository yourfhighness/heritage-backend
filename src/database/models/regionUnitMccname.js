module.exports = (sequelize, DataTypes) => {
  const regionUnitMccname = sequelize.define('RegionUnitMccname', {
    pinCode: { type: DataTypes.STRING },
    regionName: { type: DataTypes.STRING },
    unitName: { type: DataTypes.STRING },
    mccName: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  return regionUnitMccname;
};
