const up = (queryInterface, Sequelize) => queryInterface.createTable('Doctors', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  status: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
  gender: { type: Sequelize.STRING },
  specialization: { type: Sequelize.STRING },
  treatment: { type: Sequelize.STRING },
  city: { type: Sequelize.STRING },
  regnumber: { type: Sequelize.STRING },
  regcouncil: { type: Sequelize.STRING },
  regyear: { type: Sequelize.STRING },
  degree: { type: Sequelize.STRING },
  college: { type: Sequelize.STRING },
  completionyear: { type: Sequelize.STRING },
  experience: { type: Sequelize.STRING },
  establishment: { type: Sequelize.STRING },
  establishmentname: { type: Sequelize.STRING },
  establishmentcity: { type: Sequelize.STRING },
  establishmentlocality: { type: Sequelize.STRING },
  medicalregproofdocument: { type: Sequelize.STRING },
  identityproofdocument: { type: Sequelize.STRING },
  phone: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  addressname: { type: Sequelize.STRING },
  latitude: { type: Sequelize.DECIMAL },
  longitude: { type: Sequelize.DECIMAL },
  weekday: { type: Sequelize.STRING },
  starttime: { type: Sequelize.STRING },
  endtime: { type: Sequelize.STRING },
  sessiontime: { type: Sequelize.STRING },
  consultationfees: { type: Sequelize.STRING },
  establishmenthours: { type: Sequelize.STRING },
  establishmentlocation: { type: Sequelize.STRING },

  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('Doctors');

export { up, down };