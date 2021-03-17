const up = (queryInterface, Sequelize) => queryInterface.createTable('Farmers', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  profilePicture: { type: Sequelize.STRING(1000) },
  role: { type: Sequelize.STRING, defaultValue: 'farmer' },
  status: { type: Sequelize.STRING, defaultValue: 'waiting' },
  steps: { type: Sequelize.STRING },
  farmerName: { type: Sequelize.STRING },
  gender: { type: Sequelize.STRING },
  age: { type: Sequelize.DATE },
  phone: { type: Sequelize.STRING },
  unitName: { type: Sequelize.STRING },
  mccName: { type: Sequelize.STRING },
  regionName: { type: Sequelize.STRING },
  pinCode: { type: Sequelize.STRING },
  mccCode: { type: Sequelize.STRING },
  userCode: { type: Sequelize.STRING },
  isVerified: { type: Sequelize.BOOLEAN },
  password: { type: Sequelize.STRING },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('Farmers');

export { up, down };
