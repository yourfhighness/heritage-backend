const userOne = {
  userName: 'Arjun',
  gender: 'male',
  phone: '+910000000000',
  locationId: 11001100,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userTwo = {
  userName: 'Joshua',
  gender: 'male',
  phone: '+911111111111',
  locationId: 11001100,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = (queryInterface) => queryInterface.bulkInsert('Farmers', [userOne, userTwo]);
const down = (queryInterface) => queryInterface.bulkDelete('Farmers', null, {});
export { up, down };
