const data1 = {
  name: 'Anatharam',
  type: 'unitName',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const data2 = {
  name: 'Paduru',
  type: 'unitName',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const data3 = {
  name: 'Narsampally',
  type: 'unitName',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const data4 = {
  name: 'Nareshi Buddi',
  type: 'MCCName',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const data5 = {
  name: 'Ramareddy Kunta',
  type: 'MCCName',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const data6 = {
  name: 'Parpula Ravi',
  type: 'MCCName',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = (queryInterface) => queryInterface.bulkInsert('DynamicRecords', [
  data1,
  data2,
  data3,
  data4,
  data5,
  data6,
]);
const down = (queryInterface) => queryInterface.bulkDelete('DynamicRecords', null, {});
export { up, down };
