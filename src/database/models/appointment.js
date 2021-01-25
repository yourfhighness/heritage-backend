const appointmentDefinition = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    status: { type: DataTypes.STRING },
    approverId: { type: DataTypes.INTEGER },
    approverName: { type: DataTypes.STRING },
    doctorId: { type: DataTypes.INTEGER },
    doctorName: { type: DataTypes.STRING },
    petType: { type: DataTypes.STRING },
    petName: { type: DataTypes.STRING },
    petGender: { type: DataTypes.STRING },
    petDOB: { type: DataTypes.STRING },
    petBreed: { type: DataTypes.STRING },
    petHealthRecord: { type: DataTypes.STRING },
    consultationfees: { type: DataTypes.STRING },
    ownerId: { type: DataTypes.STRING },
    owner: { type: DataTypes.STRING },
    ownerEmail: { type: DataTypes.STRING },
    ownerPhone: { type: DataTypes.STRING },
    visitType: { type: DataTypes.STRING },
    reason: { type: DataTypes.STRING },
    appointmentDate: { type: DataTypes.STRING },
    appointmentStartTime: { type: DataTypes.STRING },
    appointmentEndTime: { type: DataTypes.STRING },
    appointmentSessionTime: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});

  return Appointment;
};

export default appointmentDefinition;
