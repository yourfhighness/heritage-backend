const appointmentOne = {
  doctorId: 1,
  farmerId: 2,
  cattleId: 2,
  PrescriptionId: null,
  status: 'pending',
  description: 'My cattle has broken leg',
  appointmentDate: '2021-02-05',
  appointmentStartTime: '08:00',
  photos: [
    'http://res.cloudinary.com/your-highness/image/upload/v1612864409/YJMyhqZ7K83VGxfkogRcoq0Z.png',
    'http://res.cloudinary.com/your-highness/image/upload/v1612864404/jQY2f-twrCnX5BgjYD7UqKxp.png',
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const appointmentTwo = {
  doctorId: 1,
  farmerId: 1,
  cattleId: 1,
  PrescriptionId: null,
  status: 'done',
  description: 'My bafallo has broken leg',
  appointmentDate: '2021-02-05',
  appointmentStartTime: '12:30',
  photos: [
    'http://res.cloudinary.com/your-highness/image/upload/v1612864409/YJMyhqZ7K83VGxfkogRcoq0Z.png',
    'http://res.cloudinary.com/your-highness/image/upload/v1612864404/jQY2f-twrCnX5BgjYD7UqKxp.png',
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const appointmentThree = {
  doctorId: 1,
  farmerId: 2,
  cattleId: 1,
  PrescriptionId: null,
  status: 'done',
  description: 'My bafallo has broken leg',
  appointmentDate: '2021-02-08',
  appointmentStartTime: '11:30',
  photos: [
    'http://res.cloudinary.com/your-highness/image/upload/v1612864409/YJMyhqZ7K83VGxfkogRcoq0Z.png',
    'http://res.cloudinary.com/your-highness/image/upload/v1612864404/jQY2f-twrCnX5BgjYD7UqKxp.png',
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const appointmentFour = {
  doctorId: 1,
  farmerId: 2,
  cattleId: 2,
  PrescriptionId: null,
  status: 'done',
  description: 'My cattle has broken leg',
  appointmentDate: '2021-02-05',
  appointmentStartTime: '15:00',
  photos: [
    'http://res.cloudinary.com/your-highness/image/upload/v1612864409/YJMyhqZ7K83VGxfkogRcoq0Z.png',
    'http://res.cloudinary.com/your-highness/image/upload/v1612864404/jQY2f-twrCnX5BgjYD7UqKxp.png',
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = (queryInterface) => queryInterface.bulkInsert('Appointments', [appointmentOne, appointmentTwo, appointmentThree, appointmentFour]);
const down = (queryInterface) => queryInterface.bulkDelete('Appointments', null, {});
export { up, down };
