const cattleOne = {
  profilePicture: 'https://kj1bcdn.b-cdn.net/media/28069/gir.png',
  farmerId: 1,
  status: "healthy",
  cattle: 'cow',
  cattleUID: 990033723102,
  cattleName: 'Sahiwal',
  category: 'milking',
  age: '2016-01-09',
  breed: 'jersey',
  weight: 415,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const cattleTwo = {
  profilePicture: 'https://www.rockefellerfoundation.org/wp-content/uploads/Indian-Woman-Milking-a-Cow.jpg',
  farmerId: 2,
  status: "healthy",
  cattle: 'Buffalo',
  cattleUID: 720033823139,
  cattleName: 'duhlia',
  category: 'calf',
  age: '2017-02-13',
  breed: 'godavari',
  weight: 270,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const cattleThree = {
  profilePicture: 'https://shramajeewiki.com/images/English/00148056.jpg',
  farmerId: 1,
  status: "healthy",
  cattle: 'cow',
  cattleUID: 193440372555,
  cattleName: 'desan',
  category: 'milking',
  age: '2014-08-21',
  breed: 'jersey',
  weight: 388,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = (queryInterface) => queryInterface.bulkInsert('Cattles', [cattleOne, cattleTwo, cattleThree]);
const down = (queryInterface) => queryInterface.bulkDelete('Cattles', null, {});
export { up, down };
