const medicalOne = {
  doctorId: 1,
  farmerId: 2,
  cattleId: 2,
  appointmentId: 1,
  document: 'http://res.cloudinary.com/your-highness/image/upload/v1612864409/YJMyhqZ7K83VGxfkogRcoq0Z.png',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = (queryInterface) => queryInterface.bulkInsert('Medicals', [medicalOne]);
const down = (queryInterface) => queryInterface.bulkDelete('Medicals', null, {});
export { up, down };
