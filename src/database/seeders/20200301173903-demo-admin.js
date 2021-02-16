import passwordHelper from '../../Helpers/passwordHelper';

const adminOne = {
  profilePicture: 'https://media-exp1.licdn.com/dms/image/C5603AQGOa0HFf1180Q/profile-displayphoto-shrink_200_200/0/1580515635328?e=1617235200&v=beta&t=etBBU13eKaMCFHjwzPrY4xd3_uLayn6wTgeJp4E_whU',
  adminName: 'Arjun',
  gender: 'male',
  age: '1994-09-15',
  email: 'arjunm12@gmail.com',
  phone: '+917021007499',
  password: passwordHelper.hashPassword('Qwerty@123'),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const adminTwo = {
  profilePicture: 'https://media-exp1.licdn.com/dms/image/C4D03AQHU8lKhq5pTqw/profile-displayphoto-shrink_200_200/0/1600778354473?e=1617235200&v=beta&t=aPgNEhfMlA5MXQSQ_5iXL4fD1gY3w89EsGunzwwrVm8',
  adminName: 'Joshua',
  gender: 'male',
  age: '1996-10-11',
  email: 'k.joshua855@gmail.com',
  phone: '+250789619442',
  password: passwordHelper.hashPassword('Qwerty@123'),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = (queryInterface) => queryInterface.bulkInsert('Admins', [adminOne, adminTwo]);
const down = (queryInterface) => queryInterface.bulkDelete('Admins', null, {});
export { up, down };
