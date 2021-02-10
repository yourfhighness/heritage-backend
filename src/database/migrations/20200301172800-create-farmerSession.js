const up = (queryInterface, Sequelize) => queryInterface.createTable('FarmerSessions', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  farmerId: { type: Sequelize.INTEGER },
  farmerName: { type: Sequelize.STRING },
  session: { type: Sequelize.STRING },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('FarmerSessions');

export { up, down };
