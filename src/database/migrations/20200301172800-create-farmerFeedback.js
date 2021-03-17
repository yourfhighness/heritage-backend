const up = (queryInterface, Sequelize) => queryInterface.createTable('FarmerFeedbacks', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  farmerId: { type: Sequelize.INTEGER },
  feedback: { type: Sequelize.STRING(1000) },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('FarmerFeedbacks');

export { up, down };
