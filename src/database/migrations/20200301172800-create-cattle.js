const up = (queryInterface, Sequelize) => queryInterface.createTable('Cattles', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  farmerId: { type: Sequelize.INTEGER },
  cattle: { type: Sequelize.STRING },
  cattleUID: { type: Sequelize.STRING },
  cattleName: { type: Sequelize.STRING },
  category: { type: Sequelize.STRING },
  age: { type: Sequelize.DATE },
  weight: { type: Sequelize.INTEGER },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('Cattles');

export { up, down };
