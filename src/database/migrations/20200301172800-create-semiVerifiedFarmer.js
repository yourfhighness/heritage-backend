const up = (queryInterface, Sequelize) => queryInterface.createTable('SemiVerifiedFarmers', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  profilePicture: { type: Sequelize.STRING(1000) },
  status: { type: Sequelize.STRING },
  farmerName: { type: Sequelize.STRING },
  nomineeName: { type: Sequelize.STRING },
  gender: { type: Sequelize.STRING },
  age: { type: Sequelize.DATE },
  occupation: { type: Sequelize.STRING },
  monthlyIncome: { type: Sequelize.STRING },
  cardNo: { type: Sequelize.STRING },
  enrollmentID: { type: Sequelize.STRING },
  paymentDone: { type: Sequelize.DATE },
  phone: { type: Sequelize.STRING },
  regionName: { type: Sequelize.STRING },
  unitName: { type: Sequelize.STRING },
  mccName: { type: Sequelize.STRING },
  mccCode: { type: Sequelize.STRING },
  pinCode: { type: Sequelize.STRING },
  userCode: { type: Sequelize.STRING },
  isVerified: { type: Sequelize.BOOLEAN },
  password: { type: Sequelize.STRING },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('SemiVerifiedFarmers');

export { up, down };
