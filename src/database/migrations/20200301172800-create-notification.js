const up = (queryInterface, Sequelize) => queryInterface.createTable('Notifications', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  farmerId: { type: Sequelize.INTEGER },
  doctorId: { type: Sequelize.INTEGER },
  isRead: { type: Sequelize.BOOLEAN },
  url: { type: Sequelize.STRING },
  notification: { type: Sequelize.STRING(1000) },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('Notifications');

export { up, down };
