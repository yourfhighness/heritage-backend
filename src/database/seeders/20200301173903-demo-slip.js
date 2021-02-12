const slipSampleCaseOne = {
  farmerId: 1,
  cattleId: 1,
  shift: 'morning',
  quantity: 15,
  fat: '4.5%',
  snf: '5%',
  amount: 150,
  createdAt: new Date('2020-03-01 08:00:00.339+02'),
  updatedAt: new Date('2020-03-01 08:00:00.339+02'),
};

const slipSampleCaseTwo = {
  farmerId: 1,
  cattleId: 1,
  shift: 'evening',
  quantity: 14,
  fat: '4.5%',
  snf: '5%',
  amount: 135,
  createdAt: new Date('2020-03-01 18:00:00.339+02'),
  updatedAt: new Date('2020-03-01 18:00:00.339+02'),
};

const slipOne = {
  farmerId: 1,
  cattleId: 1,
  shift: 'morning',
  quantity: 15,
  fat: '4.5%',
  snf: '5%',
  amount: 150,
  createdAt: new Date('2020-01-01 08:00:00.339+02'),
  updatedAt: new Date('2020-01-01 08:00:00.339+02'),
};

const slipTwo = {
  farmerId: 1,
  cattleId: 1,
  shift: 'evening',
  quantity: 14,
  fat: '4.5%',
  snf: '5%',
  amount: 135,
  createdAt: new Date('2020-01-01 18:00:00.339+02'),
  updatedAt: new Date('2020-01-01 18:00:00.339+02'),
};

const slipThree = {
  farmerId: 1,
  cattleId: 1,
  shift: 'morning',
  quantity: 15,
  fat: '4.5%',
  snf: '5%',
  amount: 150,
  createdAt: new Date('2021-02-10 08:00:00.339+02'),
  updatedAt: new Date('2021-02-10 08:00:00.339+02'),
};

const slipFour = {
  farmerId: 1,
  cattleId: 1,
  shift: 'evening',
  quantity: 14,
  fat: '4.5%',
  snf: '5%',
  amount: 135,
  createdAt: new Date('2021-02-10 18:00:00.339+02'),
  updatedAt: new Date('2021-02-10 18:00:00.339+02'),
};

const slipFive = {
  farmerId: 1,
  cattleId: 1,
  shift: 'morning',
  quantity: 15,
  fat: '4.5%',
  snf: '5%',
  amount: 150,
  createdAt: new Date('2021-01-31 08:00:00.339+02'),
  updatedAt: new Date('2021-01-31 08:00:00.339+02'),
};

const slipSix = {
  farmerId: 1,
  cattleId: 1,
  shift: 'evening',
  quantity: 14,
  fat: '4.5%',
  snf: '5%',
  amount: 135,
  createdAt: new Date('2021-01-31 18:00:00.339+02'),
  updatedAt: new Date('2021-01-31 18:00:00.339+02'),
};

const slipSeven = {
  farmerId: 1,
  cattleId: 1,
  shift: 'morning',
  quantity: 15,
  fat: '4.5%',
  snf: '5%',
  amount: 150,
  createdAt: new Date('2021-02-01 08:00:00.339+02'),
  updatedAt: new Date('2021-02-01 08:00:00.339+02'),
};

const slipEight = {
  farmerId: 1,
  cattleId: 1,
  shift: 'evening',
  quantity: 15,
  fat: '4.5%',
  snf: '5%',
  amount: 150,
  createdAt: new Date('2021-02-01 18:00:00.339+02'),
  updatedAt: new Date('2021-02-01 18:00:00.339+02'),
};

const slipNine = {
  farmerId: 1,
  cattleId: 1,
  shift: 'morning',
  quantity: 15,
  fat: '4.5%',
  snf: '5%',
  amount: 150,
  createdAt: new Date('2021-02-07 08:00:00.339+02'),
  updatedAt: new Date('2021-02-07 08:00:00.339+02'),
};

const slipTen = {
  farmerId: 1,
  cattleId: 1,
  shift: 'evening',
  quantity: 14,
  fat: '4.5%',
  snf: '5%',
  amount: 135,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const slipEleven = {
  farmerId: 1,
  cattleId: 1,
  shift: 'morning',
  quantity: 15,
  fat: '4.5%',
  snf: '5%',
  amount: 150,
  createdAt: new Date('2021-02-08 08:00:00.339+02'),
  updatedAt: new Date('2021-02-08 08:00:00.339+02'),
};

const slipTwelve = {
  farmerId: 1,
  cattleId: 1,
  shift: 'evening',
  quantity: 14,
  fat: '4.5%',
  snf: '5%',
  amount: 135,
  createdAt: new Date('2021-02-08 17:00:00.339+02'),
  updatedAt: new Date('2021-02-08 17:00:00.339+02'),
};

const up = (queryInterface) => queryInterface.bulkInsert('Slips', [
  slipOne,
  slipTwo,
  slipThree,
  slipFour,
  slipFive,
  slipSix,
  slipSeven,
  slipEight,
  slipNine,
  slipTen,
  slipEleven,
  slipTwelve,
  slipSampleCaseOne,
  slipSampleCaseTwo,
]);
const down = (queryInterface) => queryInterface.bulkDelete('Slips', null, {});
export { up, down };
