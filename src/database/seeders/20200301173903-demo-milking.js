const cattleOne = {
  cattleId: 1,
  milkProduction: 15,
  fatInMilk: 4.5,
  pregnantMonth: 4,
  LactationNumber: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const cattleTwo = {
  cattleId: 3,
  milkProduction: 30,
  fatInMilk: 4.0,
  pregnantMonth: 1,
  LactationNumber: 4,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = (queryInterface) => queryInterface.bulkInsert('Milkings', [cattleOne, cattleTwo]);
const down = (queryInterface) => queryInterface.bulkDelete('Milkings', null, {});
export { up, down };
