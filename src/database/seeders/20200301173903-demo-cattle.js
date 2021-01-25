const cattleOne = {
  farmerId: 1,
  cattle: 'cow',
  cattleUID: 990033723102,
  cattleName: 'Sahiwal',
  category: 'Milking',
  age: '2016-01-09',
  weight: 415,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const cattleTwo = {
  farmerId: 2,
  cattle: 'Buffalo',
  cattleUID: 720033823139,
  cattleName: 'duhlia',
  category: 'calf',
  age: '2017-02-13',
  weight: 270,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const cattleThree = {
  farmerId: 1,
  cattle: 'cow',
  cattleUID: 193440372555,
  cattleName: 'desan',
  category: 'milking',
  age: '2014-08-21',
  weight: 388,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = (queryInterface) => queryInterface.bulkInsert('Cattles', [cattleOne, cattleTwo, cattleThree]);
const down = (queryInterface) => queryInterface.bulkDelete('Cattles', null, {});
export { up, down };
