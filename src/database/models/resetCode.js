module.exports = (sequelize, DataTypes) => {
  const ResetCode = sequelize.define('ResetCode', {
    farmerId: { type: DataTypes.INTEGER },
    phone: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  return ResetCode;
};
