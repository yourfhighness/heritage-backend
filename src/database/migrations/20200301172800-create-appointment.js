const up = (queryInterface, Sequelize) => queryInterface.createTable('Appointments', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  doctorId: { type: Sequelize.INTEGER },
  farmerId: { type: Sequelize.INTEGER },
  cattleId: { type: Sequelize.INTEGER },
  PrescriptionId: { type: Sequelize.INTEGER },
  status: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING(1000) },
  appointmentDate: { type: Sequelize.DATE },
  appointmentStartTime: { type: Sequelize.STRING },
  photos: { type: Sequelize.ARRAY(Sequelize.STRING(1000)) },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('Appointments');

export { up, down };
