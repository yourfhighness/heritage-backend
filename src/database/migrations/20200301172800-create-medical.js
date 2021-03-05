const up = (queryInterface, Sequelize) => queryInterface.createTable('Medicals', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  doctorId: { type: Sequelize.INTEGER },
  farmerId: { type: Sequelize.INTEGER },
  cattleId: { type: Sequelize.INTEGER },
  appointmentId: { type: Sequelize.INTEGER },
  document: { type: Sequelize.STRING(1000) },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('Medicals');

export { up, down };
