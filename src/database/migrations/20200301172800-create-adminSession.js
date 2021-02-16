const up = (queryInterface, Sequelize) => queryInterface.createTable('AdminSessions', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  adminId: { type: Sequelize.INTEGER },
  adminName: { type: Sequelize.STRING },
  session: { type: Sequelize.STRING },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('AdminSessions');

export { up, down };
