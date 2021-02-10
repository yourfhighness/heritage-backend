const resetCodeOne = {
  farmerId: 1,
  phone: '+917021007499',
  code: '1-001193402',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = (queryInterface) => queryInterface.bulkInsert('ResetCodes', [resetCodeOne]);
const down = (queryInterface) => queryInterface.bulkDelete('ResetCodes', null, {});
export { up, down };
