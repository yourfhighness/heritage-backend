const appointmentDefinition = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    doctorId: { type: DataTypes.INTEGER },
    farmerId: { type: DataTypes.INTEGER },
    cattleId: { type: DataTypes.INTEGER },
    PrescriptionId: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    appointmentDate: { type: DataTypes.STRING },
    appointmentStartTime: { type: DataTypes.STRING },
    photos: { type: DataTypes.ARRAY(DataTypes.STRING) },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  return Appointment;
};

export default appointmentDefinition;
