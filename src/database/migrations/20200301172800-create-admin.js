const up = (queryInterface, Sequelize) => queryInterface.createTable('Admins', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  profilePicture: { type: Sequelize.STRING(1000) },
  adminName: { type: Sequelize.STRING },
  gender: { type: Sequelize.STRING },
  age: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  phone: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  regionName: { type: Sequelize.STRING },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('Admins');

export { up, down };
