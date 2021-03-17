const up = (queryInterface, Sequelize) => queryInterface.createTable('RegionUnitMccnames', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  pinCode: { type: Sequelize.STRING },
  regionName: { type: Sequelize.STRING },
  unitName: { type: Sequelize.STRING },
  mccName: { type: Sequelize.STRING },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('RegionUnitMccnames');

export { up, down };
