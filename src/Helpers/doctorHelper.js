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
        {
          model: Medical,
          as: 'Medical',
        },
      ],
    });
    return viewedData;
  }

  static async searchFarmer(phone, regionName) {
    let viewedData;
    if (regionName === 'HYDERABAD') {
      viewedData = await Farmer.findOne({ where: { [Op.and]: [{ phone }] } });
    }

    if (regionName !== 'HYDERABAD') {
      viewedData = await Farmer.findOne({ where: { [Op.and]: [{ phone }, { regionName }] } });
    }

    return viewedData;
  }

  static async searchAppointment(attribute, value, status) {
    const viewedData = await Appointment.findAll({
      where: { [Op.and]: [{ [attribute]: value }, { status }] },
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
        {
          model: Medical,
          as: 'Medical',
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
    return viewedData;
  }

  static async viewAppointmentByStatus(skip, start, doctorId, regionName, value) {
    if (regionName === 'HYDERABAD') {
      if (value === 'waiting') {
        const viewedData = await Appointment.findAndCountAll({
          where: { [Op.or]: [{ status: 'waiting' }, { status: 'confirmed' }] },
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
        return viewedData;
      }

      if (value === 'finished') {
        const viewedData = await Appointment.findAndCountAll({
          where: { [Op.or]: [{ status: 'finished' }, { status: 'rejected' }] },
          limit: skip,
          offset: start,
          order: [['id', 'DESC']],
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
        return viewedData;
      }
    }

    if (regionName !== 'HYDERABAD') {
      if (value === 'waiting') {
        const viewedData = await Appointment.findAndCountAll({
          where: { doctorId, [Op.or]: [{ status: 'waiting' }, { status: 'confirmed' }] },
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
        return viewedData;
      }

      if (value === 'finished') {
        const viewedData = await Appointment.findAndCountAll({
          where: { doctorId, [Op.or]: [{ status: 'finished' }, { status: 'rejected' }] },
          limit: skip,
          offset: start,
          order: [['id', 'DESC']],
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
        return viewedData;
      }
    }

    return undefined;
  }

  static async updateAppointmentStatus(id, doctorId, status) {
    const updateData = await Appointment.update({ status }, { where: { [Op.and]: [{ id }, { doctorId }] } });

    return updateData;
  }

  static async updateAppointment(newAttribute, newValue, attribute, value) {
    const updateData = await Appointment.update({ [newAttribute]: newValue }, { where: { [attribute]: value } });
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

    await this.updateAppointment('PrescriptionId', savedData.id, 'id', appointmentId);
    return savedData;
  }
}

export default DoctorHelpers;
