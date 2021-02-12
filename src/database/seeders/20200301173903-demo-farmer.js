import passwordHelper from '../../Helpers/passwordHelper';

const userOne = {
  profilePicture: 'https://media-exp1.licdn.com/dms/image/C5603AQGOa0HFf1180Q/profile-displayphoto-shrink_200_200/0/1580515635328?e=1617235200&v=beta&t=etBBU13eKaMCFHjwzPrY4xd3_uLayn6wTgeJp4E_whU',
  farmerName: 'Arjun',
  gender: 'male',
  age: '1994-09-15',
  phone: '+917021007499',
  unitName: 'Shantipuram',
  mccName: 'None',
  mccCode: '9252131',
  userCode: '7500',
  isVerified: true,
  password: passwordHelper.hashPassword('Qwerty@123'),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userTwo = {
  profilePicture: 'https://media-exp1.licdn.com/dms/image/C4D03AQHU8lKhq5pTqw/profile-displayphoto-shrink_200_200/0/1600778354473?e=1617235200&v=beta&t=aPgNEhfMlA5MXQSQ_5iXL4fD1gY3w89EsGunzwwrVm8',
  farmerName: 'Joshua',
  gender: 'male',
  age: '1996-10-11',
  phone: '+250789619442',
  unitName: 'Shantipuram',
  mccName: 'None',
  mccCode: '2252601',
  userCode: '7600',
  isVerified: true,
  password: passwordHelper.hashPassword('Qwerty@123'),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userThree = {
  profilePicture: 'https://media-exp1.licdn.com/dms/image/C4D03AQHU8lKhq5pTqw/profile-displayphoto-shrink_200_200/0/1600778354473?e=1617235200&v=beta&t=aPgNEhfMlA5MXQSQ_5iXL4fD1gY3w89EsGunzwwrVm8',
  farmerName: 'Ervis',
  gender: 'male',
  age: '1996-10-11',
  phone: '+250789279774',
  unitName: 'Shantipuram',
  mccName: 'None',
  mccCode: '2252601',
  userCode: '7700',
  isVerified: true,
  password: passwordHelper.hashPassword('Qwerty@123'),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = (queryInterface) => queryInterface.bulkInsert('Farmers', [userOne, userTwo, userThree]);
const down = (queryInterface) => queryInterface.bulkDelete('Farmers', null, {});
export { up, down };
