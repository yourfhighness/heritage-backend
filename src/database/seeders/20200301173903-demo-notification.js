const notificationOne = {
  farmerId: 1,
  doctorId: 1,
  isRead: false,
  url: 'heritagevetplus://appointment/1',
  notification: 'Appointment created successfully',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = (queryInterface) => queryInterface.bulkInsert('Notifications', [notificationOne]);
const down = (queryInterface) => queryInterface.bulkDelete('Notifications', null, {});
export { up, down };
