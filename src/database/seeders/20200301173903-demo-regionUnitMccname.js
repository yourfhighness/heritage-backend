const data1 = {
  pinCode: '1111111111',
  unitName: 'Anatharam',
  mccName: 'unitName',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = (queryInterface) => queryInterface.bulkInsert('RegionUnitMccnames', [data1]);
const down = (queryInterface) => queryInterface.bulkDelete('RegionUnitMccnames', null, {});
export { up, down };
