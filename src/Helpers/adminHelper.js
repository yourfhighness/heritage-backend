import { Op } from 'sequelize';
import models from '../database/models';

const { Admins, Doctor, Farmer, Cattle, Milking } = models;

class AdminHelpers {
  static async adminExist(attribute, value) {
    const viewedData = await Admins.findOne({ where: { [attribute]: value } });
    return viewedData;
  }

  static async farmerExist(attribute, value) {
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
      order: [['updatedAt', 'DESC']],
    });
    return viewedData;
  }

  static async viewAllFarmers(skip, start) {
    const viewedData = await Farmer.findAndCountAll({
      limit: skip,
      offset: start,
      order: [['updatedAt', 'DESC']],
    });
    return viewedData;
  }

  static async viewDoctorsByStatus(skip, start, value) {
    const viewedData = await Doctor.findAndCountAll({
      where: { [Op.and]: [{ status: value }] },
      limit: skip,
      offset: start,
      order: [['updatedAt', 'DESC']],
    });
    return viewedData;
  }

  static async viewFarmersByStatus(skip, start, regionName, value) {
    if (regionName === 'HYDERABAD') {
      if (value === 'waiting') {
        const data = await Farmer.findAndCountAll({
          where: { [Op.or]: [{ status: 'waiting' }, { status: 'confirmed' }] },
          limit: skip,
          offset: start,
          order: [['updatedAt', 'DESC']],
          include: [
            {
              model: Cattle,
              as: 'Cattle',
            },
          ],
        });

        return data;
      }

      if (value === 'finished') {
        const data = await Farmer.findAndCountAll({
          where: { [Op.or]: [{ status: 'finished' }, { status: 'rejected' }] },
          limit: skip,
          offset: start,
          order: [['updatedAt', 'DESC']],
          include: [
            {
              model: Cattle,
              as: 'Cattle',
            },
          ],
        });
        return data;
      }
    }

    if (regionName !== 'HYDERABAD') {
      if (value === 'waiting') {
        const data = await Farmer.findAndCountAll({
          where: { regionName, [Op.or]: [{ status: 'waiting' }, { status: 'confirmed' }] },
          limit: skip,
          offset: start,
          order: [['updatedAt', 'DESC']],
          include: [
            {
              model: Cattle,
              as: 'Cattle',
            },
          ],
        });
        return data;
      }

      if (value === 'finished') {
        const data = await Farmer.findAndCountAll({
          where: { regionName, [Op.or]: [{ status: 'finished' }, { status: 'rejected' }] },
          limit: skip,
          offset: start,
          order: [['updatedAt', 'DESC']],
          include: [
            {
              model: Cattle,
              as: 'Cattle',
            },
          ],
        });
        return data;
      }
    }

    return undefined;
  }

  static async exportFarmersByStatus(regionName, value) {
    if (regionName === 'HYDERABAD') {
      if (value === 'waiting') {
        const data = await Farmer.findAll({
          where: { [Op.or]: [{ status: 'waiting' }, { status: 'confirmed' }] },
        });

        return data;
      }

      if (value === 'finished') {
        const data = await Farmer.findAll({
          where: { [Op.or]: [{ status: 'finished' }, { status: 'rejected' }] },
        });

        return data;
      }
    }

    if (regionName !== 'HYDERABAD') {
      if (value === 'waiting') {
        const data = await Farmer.findAll({
          where: { regionName, [Op.or]: [{ status: 'waiting' }, { status: 'confirmed' }] },
        });

        return data;
      }

      if (value === 'finished') {
        const data = await Farmer.findAll({
          where: { regionName, [Op.or]: [{ status: 'finished' }, { status: 'rejected' }] },
        });

        return data;
      }
    }

    return undefined;
  }

  static async updateFarmerStatus(id, status) {
    const updateData = await Farmer.update({ status }, { where: { [Op.and]: [{ id }] } });

    return updateData;
  }

  static async updateFarmerDetails(newbody, profilePicture, existbody) {
    const updateFarmer = await Farmer.update({
      status: newbody.status || existbody.status,
      profilePicture: profilePicture || existbody.profilePicture,
      steps: newbody.steps || existbody.steps,
      farmerName: newbody.farmerName || existbody.farmerName,
      gender: newbody.gender || existbody.gender,
      age: newbody.age || existbody.age,
      phone: newbody.phone || existbody.phone,
      userCode: newbody.userCode || existbody.userCode,
      pinCode: newbody.pinCode || existbody.pinCode,
      unitCode: newbody.unitCode || existbody.unitCode,
      mccCode: newbody.mccCode || existbody.mccCode,
      mccMobile: newbody.mccMobile || existbody.mccMobile,
      plateCode: newbody.plateCode || existbody.plateCode,
      regionName: newbody.regionName ? newbody.regionName.toUpperCase() : existbody.regionName,
      unitName: newbody.unitName ? newbody.unitName.toUpperCase() : existbody.unitName,
      mccName: newbody.mccName ? newbody.mccName.toUpperCase() : existbody.mccName,
      plateName: newbody.plateName ? newbody.plateName.toUpperCase() : existbody.plateName,
      stateName: newbody.stateName ? newbody.stateName.toUpperCase() : existbody.stateName,
      districtName: newbody.districtName ? newbody.districtName.toUpperCase() : existbody.districtName,
      mendalName: newbody.mendalName ? newbody.mendalName.toUpperCase() : existbody.mendalName,
      panchayatName: newbody.panchayatName ? newbody.panchayatName.toUpperCase() : existbody.panchayatName,
      villageName: newbody.villageName ? newbody.villageName.toUpperCase() : existbody.villageName,
      isVerified: existbody.isVerified,
      password: existbody.password,
    }, { where: { id: existbody.id } });

    if (updateFarmer) {
      const farmer = await this.farmerExist('id', existbody.id);
      return farmer;
    }
    return null;
  }
}

export default AdminHelpers;
