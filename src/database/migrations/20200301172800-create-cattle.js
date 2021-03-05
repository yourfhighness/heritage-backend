const up = (queryInterface, Sequelize) => queryInterface.createTable('Cattles', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  profilePicture: { type: Sequelize.STRING(1000) },
  farmerId: { type: Sequelize.INTEGER },
  status: { type: Sequelize.STRING },
  cattle: { type: Sequelize.STRING },
  cattleUID: { type: Sequelize.STRING },
  cattleName: { type: Sequelize.STRING },
  category: { type: Sequelize.STRING },
  age: { type: Sequelize.DATE },
  breed: { type: Sequelize.STRING },
  weight: { type: Sequelize.INTEGER },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('Cattles');

export { up, down };
