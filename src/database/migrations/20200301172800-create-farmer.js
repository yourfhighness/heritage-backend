const up = (queryInterface, Sequelize) => queryInterface.createTable('Farmers', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  profilePicture: { type: Sequelize.STRING(1000) },
  role: { type: Sequelize.STRING },
  assigned: { type: Sequelize.STRING },
  status: { type: Sequelize.STRING },
  steps: { type: Sequelize.STRING },
  appVersion: { type: Sequelize.STRING },
  appLanguage: { type: Sequelize.STRING },
  farmerName: { type: Sequelize.STRING },
  gender: { type: Sequelize.STRING },
  age: { type: Sequelize.DATE },
  phone: { type: Sequelize.STRING },
  userCode: { type: Sequelize.STRING },
  pinCode: { type: Sequelize.STRING },
  unitCode: { type: Sequelize.STRING },
  mccCode: { type: Sequelize.STRING },
  mccMobile: { type: Sequelize.STRING },
  plateCode: { type: Sequelize.STRING },
  regionName: { type: Sequelize.STRING },
  unitName: { type: Sequelize.STRING },
  mccName: { type: Sequelize.STRING },
  plateName: { type: Sequelize.STRING },
  stateName: { type: Sequelize.STRING },
  districtName: { type: Sequelize.STRING },
  mendalName: { type: Sequelize.STRING },
  panchayatName: { type: Sequelize.STRING },
  villageName: { type: Sequelize.STRING },
  isVerified: { type: Sequelize.BOOLEAN },
  password: { type: Sequelize.STRING },
  firebaseToken: { type: Sequelize.STRING },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('Farmers');

export { up, down };
