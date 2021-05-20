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

  static async leastFrequent(array, arrayLength) {
    array.sort();

    let minCount = arrayLength + 1; let
      result = -1;
    let currentCount = 1;

    for (let i = 1; i < arrayLength; i += 1) {
      if (array[i] === array[i - 1]) currentCount += 1;
      else {
        if (currentCount < minCount) {
          minCount = currentCount;
          result = array[i - 1];
        }

        currentCount = 1;
      }
    }

    if (currentCount < minCount) {
      minCount = currentCount;
      result = array[arrayLength - 1];
    }

    return result;
  }

  static async saveAppointment(cattleId, farmerId, regionName, PrescriptionId, photos, body) {
    let allDoctors;
    const doctorIdContainer = [];

    if (regionName === null) {
      allDoctors = await Doctor.findAll({ where: { regionName: 'HYDERABAD-1' } });
    }
    if (regionName !== null) {
      allDoctors = await Doctor.findAll({ where: { regionName: regionName.toUpperCase() } });
    }
    for (let i = 0; i < allDoctors.length; i += 1) {
      const assignedDoctors = await Appointment.findAll({ where: { doctorId: allDoctors[i].id } });
      for (let j = 0; j < assignedDoctors.length; j += 1) {
        doctorIdContainer.push(assignedDoctors[j].doctorId);
      }
    }

    const savedAppointment = await Appointment.create({
      doctorId: await this.leastFrequent(doctorIdContainer, doctorIdContainer.length),
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
      include:
        [
          {
            model: Medical,
            as: 'Medical',
          },
          {
            model: Cattle,
            as: 'Cattle',
          },
          {
            model: Farmer,
            as: 'Farmer',
          },
          {
            model: Doctor,
            as: 'Doctor',
          },
        ],
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
