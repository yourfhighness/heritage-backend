/* eslint-disable no-await-in-loop */
import { Op } from 'sequelize';
import models from '../database/models';

const { Doctor, Appointment, Farmer, Cattle, Medical } = models;

class AppointmentHelpers {
  static async viewAllDoctors() {
    const viewedData = await Doctor.findAll({ order: [['id', 'DESC']] });
    return viewedData;
  }

  static async findLowOccurancyDoctor(attribute, value) {
    const viewedData = await Appointment.findAll({ where: { [attribute]: value } });
    return viewedData;
  }

  static async saveAppointment(cattleId, farmerId, regionName, PrescriptionId, photos, body) {
    let viewData;

    if (regionName === null) {
      viewData = await Doctor.findOne({ where: { regionName: 'HYDERABAD-1' } });
    }
    if (regionName !== null) {
      viewData = await Doctor.findOne({ where: { regionName: regionName.toUpperCase() } });
    }

    const savedAppointment = await Appointment.create({
      doctorId: viewData.id,
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
    const appointments = await Appointment.findAndCountAll({
      where: { farmerId, [Op.or]: [{ status: 'waiting' }, { status: 'confirmed' }] },
      limit: skip,
      offset: start,
      order: [['updatedAt', 'DESC']],
      include: [
        {
          model: Farmer,
          as: 'Farmer',
        },
        {
          model: Cattle,
          as: 'Cattle',
        },
        {
          model: Medical,
          as: 'Medical',
        },
      ],
    });
    return appointments;
  }

  static async viewPastAppointment(farmerId, skip, start) {
    const appointments = await Appointment.findAndCountAll({
      where: { farmerId, [Op.or]: [{ status: 'finished' }, { status: 'rejected' }] },
      limit: skip,
      offset: start,
      order: [['updatedAt', 'DESC']],
      include: [
        {
          model: Farmer,
          as: 'Farmer',
        },
        {
          model: Cattle,
          as: 'Cattle',
        },
        {
          model: Medical,
          as: 'Medical',
        },
      ],
    });
    return appointments;
  }
}

export default AppointmentHelpers;
