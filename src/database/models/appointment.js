module.exports = (sequelize, DataTypes) => {
  const appointment = sequelize.define('Appointment', {
    doctorId: { type: DataTypes.INTEGER },
    farmerId: { type: DataTypes.INTEGER },
    cattleId: { type: DataTypes.INTEGER },
    PrescriptionId: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING(1000) },
    appointmentDate: { type: DataTypes.DATE },
    appointmentStartTime: { type: DataTypes.STRING },
    photos: { type: DataTypes.ARRAY(DataTypes.STRING) },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  appointment.associate = (models) => {
    appointment.belongsTo(models.Farmer, {
      foreignKey: 'farmerId',
      as: 'Farmer',
      onDelete: 'CASCADE',
    });

    appointment.belongsTo(models.Doctor, {
      foreignKey: 'doctorId',
      as: 'Doctor',
      onDelete: 'CASCADE',
    });

    appointment.belongsTo(models.Cattle, {
      foreignKey: 'cattleId',
      as: 'Cattle',
      onDelete: 'CASCADE',
    });

    appointment.belongsTo(models.Medical, {
      foreignKey: 'PrescriptionId',
      as: 'Medical',
      onDelete: 'CASCADE',
    });
  };

  return appointment;
};
