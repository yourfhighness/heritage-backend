const up = (queryInterface, Sequelize) => queryInterface.createTable('Milkings', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  cattleId: { type: Sequelize.INTEGER },
  milkProduction: { type: Sequelize.INTEGER },
  fatInMilk: { type: Sequelize.INTEGER },
  pregnantMonth: { type: Sequelize.INTEGER },
  LactationNumber: { type: Sequelize.INTEGER },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('Milkings');

export { up, down };
