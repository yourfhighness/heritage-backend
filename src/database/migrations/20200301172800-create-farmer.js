const up = (queryInterface, Sequelize) => queryInterface.createTable('Farmers', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  userName: { type: Sequelize.STRING },
  gender: { type: Sequelize.STRING },
  phone: { type: Sequelize.STRING },
  locationId: { type: Sequelize.STRING },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('Farmers');

export { up, down };
