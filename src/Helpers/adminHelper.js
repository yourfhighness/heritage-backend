import { Op } from 'sequelize';
import models from '../database/models';

const { Admins, Doctor, Farmer, Cattle, Milking } = models;

class AdminHelpers {
  static async adminExist(attribute, value) {
    const viewedData = await Admins.findOne({ where: { [attribute]: value } });
    return viewedData;
  }

  static async FarmerExist(attribute, value) {
    const viewedData = await Farmer.findOne({
      where: { [attribute]: value },
      include: [
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

  static async viewAllDoctors(skip, start) {
    const viewedData = await Doctor.findAndCountAll({
      limit: skip,
      offset: start,
      order: [['id', 'DESC']],
    });
    return viewedData;
  }

  static async viewAllFarmers(skip, start) {
    const viewedData = await Farmer.findAndCountAll({
      limit: skip,
      offset: start,
      order: [['id', 'DESC']],
    });
    return viewedData;
  }

  static async viewDoctorsByStatus(skip, start, value) {
    const viewedData = await Doctor.findAndCountAll({
      where: { [Op.and]: [{ status: value }] },
      limit: skip,
      offset: start,
      order: [['id', 'DESC']],
    });
    return viewedData;
  }

  static async viewFarmersByStatus(skip, start, value) {
    if (value === 'waiting') {
      const viewedData = await Farmer.findAndCountAll({
        where: { [Op.or]: [{ status: 'waiting' }, { status: 'confirmed' }] },
        limit: skip,
        offset: start,
        include: [
          {
            model: Cattle,
            as: 'Cattle',
          },
        ],
      });
      return viewedData;
    }

    if (value === 'finished') {
      const viewedData = await Farmer.findAndCountAll({
        where: { [Op.or]: [{ status: 'finished' }, { status: 'rejected' }] },
        limit: skip,
        offset: start,
        include: [
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

  static async updateFarmerStatus(id, status) {
    const updateData = await Farmer.update({ status }, { where: { [Op.and]: [{ id }] } });

    return updateData;
  }
}

export default AdminHelpers;
