const up = (queryInterface, Sequelize) => queryInterface.createTable('RegionUnitMccnames', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  pinCode: { type: Sequelize.STRING },
  unitCode: { type: Sequelize.STRING },
  mccCode: { type: Sequelize.STRING },
  mccMobile: { type: Sequelize.STRING },
  plateCode: { type: Sequelize.STRING },
  regionName: { type: Sequelize.STRING },
  unitName: { type: Sequelize.STRING },
  mccName: { type: Sequelize.STRING },
  plateName: { type: Sequelize.STRING },
  stateName: { type: Sequelize.STRING },
  districtName: { type: Sequelize.STRING },
  mendalName: { type: Sequelize.STRING },
  panchayatName: { type: Sequelize.STRING },
  villageName: { type: Sequelize.STRING },
  createdAt: { allowNull: false, type: Sequelize.DATE },
  updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const down = (queryInterface) => queryInterface.dropTable('RegionUnitMccnames');

export { up, down };
