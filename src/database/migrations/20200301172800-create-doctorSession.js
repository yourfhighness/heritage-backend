const up = (queryInterface, Sequelize) => queryInterface.createTable('DoctorSessions', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  doctorId: { type: Sequelize.INTEGER },
  doctorName: { type: Sequelize.STRING },
  session: { type: Sequelize.STRING(1000) },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('DoctorSessions');

export { up, down };
