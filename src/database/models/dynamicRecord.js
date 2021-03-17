module.exports = (sequelize, DataTypes) => {
  const dynamicRecord = sequelize.define('DynamicRecord', {
    name: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  return dynamicRecord;
};
