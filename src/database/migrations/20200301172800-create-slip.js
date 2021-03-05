const up = (queryInterface, Sequelize) => queryInterface.createTable('Slips', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  farmerId: { type: Sequelize.INTEGER },
  cattleId: { type: Sequelize.INTEGER },
  issueDate: { type: Sequelize.DATE },
  shift: { type: Sequelize.STRING },
  quantity: { type: Sequelize.INTEGER },
  fat: { type: Sequelize.STRING },
  snf: { type: Sequelize.STRING },
  amount: { type: Sequelize.INTEGER },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('Slips');

export { up, down };
