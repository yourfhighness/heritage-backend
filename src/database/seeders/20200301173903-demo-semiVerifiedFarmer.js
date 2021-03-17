import passwordHelper from '../../Helpers/passwordHelper';

const userOne = {
  profilePicture: 'https://media-exp1.licdn.com/dms/image/C5603AQGOa0HFf1180Q/profile-displayphoto-shrink_200_200/0/1580515635328?e=1617235200&v=beta&t=etBBU13eKaMCFHjwzPrY4xd3_uLayn6wTgeJp4E_whU',
  status: 'confirmed',
  farmerName: 'Arjun',
  nomineeName: 'Murali',
  gender: 'male',
  age: '1994-09-15',
  phone: '+917021007499',
  occupation: 'farmer',
  monthlyIncome: '1800',
  cardNo: '214630402749',
  enrollmentID: 'HFL/R004/1763/26/2',
  paymentDone: '2020-12-12',
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

const up = (queryInterface) => queryInterface.bulkInsert('SemiVerifiedFarmers', [userOne]);
const down = (queryInterface) => queryInterface.bulkDelete('SemiVerifiedFarmers', null, {});
export { up, down };
