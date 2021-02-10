const slipSampleCaseOne = {
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