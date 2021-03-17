import passwordHelper from '../../Helpers/passwordHelper';

const userOne = {
  profilePicture: 'https://media-exp1.licdn.com/dms/image/C5603AQGOa0HFf1180Q/profile-displayphoto-shrink_200_200/0/1580515635328?e=1617235200&v=beta&t=etBBU13eKaMCFHjwzPrY4xd3_uLayn6wTgeJp4E_whU',
  role: 'employee',
  status: 'confirmed',
  steps: 'steps one',
  farmerName: 'Arjun',
  gender: 'male',
  age: '1994-09-15',
  phone: '+917021007499',
  unitName: 'Shantipuram',
  mccName: 'None',
  regionName: null,
  pinCode: null,
  mccCode: '9252131',
  userCode: '7500',
  isVerified: true,
  password: passwordHelper.hashPassword('Qwerty@123'),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userTwo = {
  profilePicture: 'https://media-exp1.licdn.com/dms/image/C4D03AQHU8lKhq5pTqw/profile-displayphoto-shrink_200_200/0/1600778354473?e=1617235200&v=beta&t=aPgNEhfMlA5MXQSQ_5iXL4fD1gY3w89EsGunzwwrVm8',
  role: 'employee',
  status: 'confirmed',
  steps: 'steps one',
  farmerName: 'Joshua',
  gender: 'male',
  age: '1996-10-11',
  phone: '+250789619442',
  unitName: 'Shantipuram',
  mccName: 'None',
  mccCode: '2252601',
  regionName: null,
  pinCode: null,
  userCode: '7600',
  isVerified: true,
  password: passwordHelper.hashPassword('Qwerty@123'),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userThree = {
  profilePicture: 'https://media-exp1.licdn.com/dms/image/C4D03AQHU8lKhq5pTqw/profile-displayphoto-shrink_200_200/0/1600778354473?e=1617235200&v=beta&t=aPgNEhfMlA5MXQSQ_5iXL4fD1gY3w89EsGunzwwrVm8',
  role: 'employee',
  status: 'confirmed',
  steps: 'steps one',
  farmerName: 'Ervis',
  gender: 'male',
  age: '1996-10-11',
  phone: '+250789279774',
  unitName: 'Shantipuram',
  mccName: 'None',
  mccCode: '2252601',
  regionName: null,
  pinCode: null,
  userCode: '7700',
  isVerified: true,
  password: passwordHelper.hashPassword('Qwerty@123'),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userFour = {
  profilePicture: 'https://media-exp1.licdn.com/dms/image/C4D03AQHU8lKhq5pTqw/profile-displayphoto-shrink_200_200/0/1600778354473?e=1617235200&v=beta&t=aPgNEhfMlA5MXQSQ_5iXL4fD1gY3w89EsGunzwwrVm8',
  role: 'employee',
  status: 'confirmed',
  steps: 'steps one',
  farmerName: 'Admin 111',
  gender: 'male',
  age: '1996-10-11',
  phone: '+250789279774',
  unitName: 'Shantipuram',
  mccName: 'None',
  mccCode: '2252601',
  regionName: null,
  pinCode: null,
  userCode: '7700',
  isVerified: true,
  password: passwordHelper.hashPassword('admin@111'),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userFive = {
  profilePicture: 'https://media-exp1.licdn.com/dms/image/C4D03AQHU8lKhq5pTqw/profile-displayphoto-shrink_200_200/0/1600778354473?e=1617235200&v=beta&t=aPgNEhfMlA5MXQSQ_5iXL4fD1gY3w89EsGunzwwrVm8',
  role: 'employee',
  status: 'confirmed',
  steps: 'steps one',
  farmerName: 'Admin 222',
  gender: 'male',
  age: '1996-10-11',
  phone: '+250789279774',
  unitName: 'Shantipuram',
  mccName: 'None',
  mccCode: '2252601',
  regionName: null,
  pinCode: null,
  userCode: '7700',
  isVerified: true,
  password: passwordHelper.hashPassword('admin@222'),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = (queryInterface) => queryInterface.bulkInsert('Farmers', [userOne, userTwo, userThree, userFour, userFive]);
const down = (queryInterface) => queryInterface.bulkDelete('Farmers', null, {});
export { up, down };
