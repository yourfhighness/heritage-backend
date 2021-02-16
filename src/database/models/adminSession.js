module.exports = (sequelize, DataTypes) => {
  const adminSession = sequelize.define('AdminSession', {
    adminId: { type: DataTypes.INTEGER },
    adminName: { type: DataTypes.STRING },
    session: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  return adminSession;
};
