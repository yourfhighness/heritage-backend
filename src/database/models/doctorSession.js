module.exports = (sequelize, DataTypes) => {
  const doctorSession = sequelize.define('DoctorSession', {
    doctorId: { type: DataTypes.INTEGER },
    doctorName: { type: DataTypes.STRING },
    session: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  return doctorSession;
};
