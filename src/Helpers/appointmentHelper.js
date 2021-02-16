/* eslint-disable no-await-in-loop */
import { Op } from 'sequelize';
import models from '../database/models';

const { Doctor, Appointment } = models;

class AppointmentHelpers {
  static async viewAllDoctors() {
    const viewedData = await Doctor.findAll({ order: [['id', 'DESC']] });
    return viewedData;
  }

  static async findLowOccurancyDoctor(attribute, value) {
    const viewedData = await Appointment.findAll({ where: { [attribute]: value } });
    return viewedData;
  }

  static async saveAppointment(cattleId, farmerId, PrescriptionId, photos, body) {
    const allDoctors = [];
    const viewData = await this.viewAllDoctors();

    for (let i = 0; i < viewData.length; i += 1) {
      allDoctors.push(viewData[i].id);

      // const occurancyDoctor = await this.findLowOccurancyDoctor('doctorId', viewData[i].id);
      // for (let j = 0; j < occurancyDoctor.length; j += 1) {
      //   if (occurancyDoctor.length > 0) {
      //     allDoctors.push(occurancyDoctor[j].doctorId);
      //   }
      // }
    }

    const savedAppointment = await Appointment.create({
      doctorId: allDoctors[Math.floor(Math.random() * allDoctors.length)],
      cattleId,
      farmerId,
      PrescriptionId,
      status: 'waiting',
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

  static async deleteAppointment(appointmentId) {
    await Appointment.destroy({ where: { id: appointmentId } });
  }

  static async viewUpcomingAppointment(farmerId, skip, start) {
    const target = new Date();
    target.setDate(target.getDate() - 1);
    const targetHour = target.getHours();
    const targetMinutes = target.getMinutes();
    const targetTime = `${targetHour}:${targetMinutes}`;
    const targetDate = target.toISOString().split('T')[0];
    console.log(targetTime);

    const appointments = await Appointment.findAndCountAll({
      where: { [Op.and]: [
        { farmerId },
        { appointmentDate: { [Op.gt]: new Date(targetDate) } },
        // { appointmentStartTime: { [Op.gt]: targetTime } },
      ],
      [Op.or]: [
        { status: 'waiting' },
        { status: 'confirmed' },
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
    console.log(targetTime);

    const appointments = await Appointment.findAndCountAll({
      where: { [Op.and]: [
        { farmerId },
        { appointmentDate: { [Op.lt]: new Date(targetDate) } },
        // { appointmentStartTime: { [Op.lt]: targetTime } },
      ],
      [Op.or]: [
        { status: 'finished' },
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
