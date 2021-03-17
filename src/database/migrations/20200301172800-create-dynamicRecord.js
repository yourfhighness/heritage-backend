const up = (queryInterface, Sequelize) => queryInterface.createTable('DynamicRecords', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: { type: Sequelize.STRING },
  type: { type: Sequelize.STRING },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('DynamicRecords');

export { up, down };
