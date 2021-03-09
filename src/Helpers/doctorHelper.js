import { Op } from 'sequelize';
import models from '../database/models';

const { Doctor, Farmer, Cattle, Milking, Appointment, Medical } = models;

class DoctorHelpers {
  static async doctorExist(attribute, value) {
    const viewedData = await Doctor.findOne({ where: { [attribute]: value } });
    return viewedData;
  }

  static async appointmentExist(attribute, value) {
    const viewedData = await Appointment.findOne({
      where: { [attribute]: value },
      include: [
        {
          model: Farmer,
          as: 'Farmer',
        },
        {
          model: Cattle,
          as: 'Cattle',

          include: [
            {
              model: Milking,
              as: 'Milking',
            },
          ],
        },
      ],
    });
    return viewedData;
  }

  static async viewAppointment(skip, start, doctorId) {
    const viewedData = await Appointment.findAndCountAll({
      where: { [Op.and]: [{ doctorId }] },
      limit: skip,
      offset: start,
      order: [['id', 'DESC']],
    });
    return viewedData;
  }

  static async viewAppointmentByStatus(skip, start, doctorId, value) {
    if (value === 'waiting') {
      const viewedData = await Appointment.findAndCountAll({
        where: { [Op.and]: [{ doctorId }], [Op.or]: [{ status: 'waiting' }, { status: 'confirmed' }],
        },
        limit: skip,
        offset: start,
        include: [
          {
            model: Farmer,
            as: 'Farmer',
          },
          {
            model: Cattle,
            as: 'Cattle',
          },
        ],
      });
      return viewedData;
    }

    if (value === 'finished') {
      const viewedData = await Appointment.findAndCountAll({
        where: { [Op.and]: [{ doctorId }], [Op.or]: [{ status: 'finished' }, { status: 'rejected' }],
        },
        limit: skip,
        offset: start,
        include: [
          {
            model: Farmer,
            as: 'Farmer',
          },
          {
            model: Cattle,
            as: 'Cattle',
          },
        ],
      });
      return viewedData;
    }

    return undefined;
  }

  static async updateAppointmentStatus(id, doctorId, status) {
    const updateData = await Appointment.update({ status }, { where: { [Op.and]: [{ id }, { doctorId }] } });

    return updateData;
  }

  static async saveMedical(body, appointmentId, document) {
    const savedData = await Medical.create({
      doctorId: body.doctorId,
      farmerId: body.farmerId,
      cattleId: body.cattleId,
      appointmentId,
      document,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return savedData;
  }
}

export default DoctorHelpers;