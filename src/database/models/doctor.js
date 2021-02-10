/* Here we have Service table */
const doctorDefinition = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('Doctor', {
    status: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    specialization: { type: DataTypes.STRING },
    treatment: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    regnumber: { type: DataTypes.STRING },
    regcouncil: { type: DataTypes.STRING },
    regyear: { type: DataTypes.STRING },
    degree: { type: DataTypes.STRING },
    college: { type: DataTypes.STRING },
    completionyear: { type: DataTypes.STRING },
    experience: { type: DataTypes.STRING },
    establishment: { type: DataTypes.STRING },
    establishmentname: { type: DataTypes.STRING },
    establishmentcity: { type: DataTypes.STRING },
    establishmentlocality: { type: DataTypes.STRING },
    medicalregproofdocument: { type: DataTypes.STRING },
    identityproofdocument: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    addressname: { type: DataTypes.STRING },
    latitude: { type: DataTypes.DECIMAL(11, 2) },
    longitude: { type: DataTypes.DECIMAL(11, 2) },
    weekday: { type: DataTypes.STRING },
    starttime: { type: DataTypes.STRING },
    endtime: { type: DataTypes.STRING },
    sessiontime: { type: DataTypes.STRING },
    consultationfees: { type: DataTypes.STRING },
    establishmenthours: { type: DataTypes.STRING },
    establishmentlocation: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});

  return Doctor;
};

export default doctorDefinition;
