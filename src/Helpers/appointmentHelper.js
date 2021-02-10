import { Op } from 'sequelize';
import models from '../database/models';

const { Appointment } = models;

class AppointmentHelpers {
  static async saveAppointment(cattleId, farmerId, PrescriptionId, photos, body) {
    const savedAppointment = await Appointment.create({
      doctorId: body.doctorId,
      cattleId,
      farmerId,
      PrescriptionId,
      status: 'pending',
      description: body.description,
      appointmentDate: body.appointmentDate,
      appointmentStartTime: body.appointmentStartTime,
      photos,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return savedAppointment;
  }

  static async viewAppointment(id, farmerId) {
    const appointment = await Appointment.findOne({
      where: { [Op.and]: [{ id }, { farmerId }] },
    });
    return appointment;
  }

  static async viewUpcomingAppointment(farmerId, skip, start) {
    const target = new Date();
    target.setDate(target.getDate() - 1);
    const targetHour = target.getHours();
    const targetMinutes = target.getMinutes();
    const targetTime = `${targetHour}:${targetMinutes}`;
    const targetDate = target.toISOString().split('T')[0];

    const appointments = await Appointment.findAndCountAll({
      where: { [Op.and]: [
        { farmerId },
        { appointmentDate: { [Op.gt]: targetDate } },
        { appointmentStartTime: { [Op.gt]: targetTime } },
      ],
      [Op.or]: [
        { status: 'pending' },
        { status: 'approved' },
      ],
      },
      limit: skip,
      offset: start,
      order: [['id', 'DESC']],
    });
    return appointments;
  }

  static async viewPastAppointment(farmerId, skip, start) {
    const target = new Date();
    target.setDate(target.getDate() + 1);
    const targetHour = target.getHours();
    const targetMinutes = target.getMinutes();
    const targetTime = `${targetHour}:${targetMinutes}`;
    const targetDate = target.toISOString().split('T')[0];

    const appointments = await Appointment.findAndCountAll({
      where: { [Op.and]: [
        { farmerId },
        { appointmentDate: { [Op.lt]: targetDate } },
        { appointmentStartTime: { [Op.lt]: targetTime } },
      ],
      [Op.or]: [
        { status: 'done' },
        { status: 'rejected' },
      ],
      },
      limit: skip,
      offset: start,
      order: [['id', 'DESC']],
    });
    return appointments;
  }
}

export default AppointmentHelpers;
