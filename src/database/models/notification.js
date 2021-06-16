module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    farmerId: { type: DataTypes.INTEGER },
    doctorId: { type: DataTypes.INTEGER },
    isRead: { type: DataTypes.BOOLEAN },
    url: { type: DataTypes.STRING },
    notification: { type: DataTypes.STRING(1000) },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  return Notification;
};
