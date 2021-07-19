module.exports = (sequelize, DataTypes) => {
  const regionUnitMccname = sequelize.define('RegionUnitMccname', {
    document: { type: DataTypes.STRING },
    pinCode: { type: DataTypes.STRING },
    unitCode: { type: DataTypes.STRING },
    mccCode: { type: DataTypes.STRING },
    mccMobile: { type: DataTypes.STRING },
    plateCode: { type: DataTypes.STRING },
    regionName: { type: DataTypes.STRING },
    unitName: { type: DataTypes.STRING },
    mccName: { type: DataTypes.STRING },
    plateName: { type: DataTypes.STRING },
    stateName: { type: DataTypes.STRING },
    districtName: { type: DataTypes.STRING },
    mendalName: { type: DataTypes.STRING },
    panchayatName: { type: DataTypes.STRING },
    villageName: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  return regionUnitMccname;
};
