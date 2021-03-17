const resetCodeOne = {
  farmerId: 1,
  feedback: 'I liked the service',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = (queryInterface) => queryInterface.bulkInsert('FarmerFeedbacks', [resetCodeOne]);
const down = (queryInterface) => queryInterface.bulkDelete('FarmerFeedbacks', null, {});
export { up, down };
