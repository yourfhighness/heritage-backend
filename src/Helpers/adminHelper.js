import Sequelize, { Op } from 'sequelize';
import models from '../database/models';

const { Admins, Doctor, Farmer, Cattle, Milking, Appointment, Medical, FarmerFeedback, RegionUnitMccname } = models;

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

  static async viewAllDoctors(skip, start) {
    const viewedData = await Doctor.findAndCountAll({
      limit: skip,
      offset: start,
      order: [['updatedAt', 'DESC']],
    });
    return viewedData;
  }

  static async viewAllEmployees(value, skip, start) {
    const viewedData = await Farmer.findAndCountAll({
      where: { role: 'employee' },
      limit: skip,
      offset: start,
      order: [['updatedAt', 'DESC']],
    });
    return viewedData;
  }

  static async viewAllMccRepresentative(attribute, value, regionName, skip, start) {
    const viewedData = await Farmer.findAndCountAll({
      where: { role: 'MCC Representative', [attribute]: value, regionName },
      limit: skip,
      offset: start,
      order: [['updatedAt', 'DESC']],
    });
    return viewedData;
  }

  static async viewAllFarmers(value, skip, start) {
    const viewedData = await Farmer.findAndCountAll({
      where: { role: 'farmer' },
      limit: skip,
      offset: start,
      order: [['updatedAt', 'DESC']],
    });
    return viewedData;
  }

  static async viewAppointmentByStatus(skip, start, regionName, value) {
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
          where: { regionName, [Op.or]: [{ status: 'waiting' }, { status: 'confirmed' }] },
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
          where: { regionName, [Op.or]: [{ status: 'finished' }, { status: 'rejected' }] },
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

  static async createRegion(body, document) {
    const data = await RegionUnitMccname.create({
      document,
      pinCode: body.pinCode,
      unitCode: body.unitCode,
      mccCode: body.mccCode,
      mccMobile: body.mccMobile,
      plateCode: body.plateCode,
      regionName: body.regionName,
      unitName: body.unitName,
      mccName: body.mccName,
      plateName: body.plateName,
      stateName: body.stateName,
      districtName: body.districtName,
      mendalName: body.mendalName,
      panchayatName: body.panchayatName,
      villageName: body.villageName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return data;
  }

  static async updateFarmerField(regionName, id, value, field) {
    if (regionName === 'HYDERABAD') {
      const updateData = await Farmer.update({ [field]: value }, { where: { id } });

      if (updateData[0] === 1) return this.farmerExist('id', id);
      return undefined;
    }

    const updateData = await Farmer.update({ [field]: value }, { where: { regionName, id } });
    if (updateData[0] === 1) return this.farmerExist('id', id);
    return undefined;
  }

  static async updateFarmerDetails(newbody, profilePicture, existbody) {
    const updateData = await Farmer.update({
      role: newbody.role || existbody.role,
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

    if (updateData[0] === 1) return this.farmerExist('id', existbody.id);
    return undefined;
  }

  static async adminExportFarmersByStatusAndRegionName(regionName, value) {
    if (regionName === 'HYDERABAD') {
      if (value === 'waiting') {
        const data = await Farmer.findAll({
          where: { [Op.or]: [{ status: 'waiting' }, { status: 'confirmed' }] },
          attributes: [
            [Sequelize.literal('"id"'), 'User ID'],
            [Sequelize.literal('"profilePicture"'), 'ProfilePicture'],
            [Sequelize.literal('"role"'), 'User Type'],
            [Sequelize.literal('"status"'), 'Registration Status'],
            [Sequelize.literal('"steps"'), 'Steps No'],
            [Sequelize.literal('"appVersion"'), 'App Version'],
            [Sequelize.literal('"farmerName"'), 'Farmer Name'],
            [Sequelize.literal('"gender"'), 'Gender'],
            [Sequelize.literal('"age"'), 'Age'],
            [Sequelize.literal('"phone"'), 'Phone Number'],
            [Sequelize.literal('"userCode"'), 'User Code'],
            [Sequelize.literal('"pinCode"'), 'Pin Code'],
            [Sequelize.literal('"unitCode"'), 'Unit Code'],
            [Sequelize.literal('"mccCode"'), 'Mcc Code'],
            [Sequelize.literal('"mccMobile"'), 'Mcc Rep Mobile'],
            [Sequelize.literal('"plateCode"'), 'Plant Code'],
            [Sequelize.literal('"regionName"'), 'Region Name'],
            [Sequelize.literal('"unitName"'), 'Unit Name'],
            [Sequelize.literal('"mccName"'), 'Mcc Name'],
            [Sequelize.literal('"plateName"'), 'Plant Name'],
            [Sequelize.literal('"stateName"'), 'State Name'],
            [Sequelize.literal('"districtName"'), 'District Name'],
            [Sequelize.literal('"mendalName"'), 'Mandal Name'],
            [Sequelize.literal('"panchayatName"'), 'Panchayat Name'],
            [Sequelize.literal('"villageName"'), 'Village Name'],
            [Sequelize.literal('"isVerified"'), 'isVerified'],
            [Sequelize.literal('"password"'), 'Password'],
            [Sequelize.literal('"firebaseToken"'), 'Firebase Token'],
            [Sequelize.literal('"createdAt"'), 'Created At'],
            [Sequelize.literal('"updatedAt"'), 'Updated At'],
          ],
        });

        return data;
      }

      if (value === 'finished') {
        const data = await Farmer.findAll({
          where: { [Op.or]: [{ status: 'finished' }, { status: 'rejected' }] },
          attributes: [
            [Sequelize.literal('"id"'), 'User ID'],
            [Sequelize.literal('"profilePicture"'), 'ProfilePicture'],
            [Sequelize.literal('"role"'), 'User Type'],
            [Sequelize.literal('"status"'), 'Registration Status'],
            [Sequelize.literal('"steps"'), 'Steps No'],
            [Sequelize.literal('"appVersion"'), 'App Version'],
            [Sequelize.literal('"farmerName"'), 'Farmer Name'],
            [Sequelize.literal('"gender"'), 'Gender'],
            [Sequelize.literal('"age"'), 'Age'],
            [Sequelize.literal('"phone"'), 'Phone Number'],
            [Sequelize.literal('"userCode"'), 'User Code'],
            [Sequelize.literal('"pinCode"'), 'Pin Code'],
            [Sequelize.literal('"unitCode"'), 'Unit Code'],
            [Sequelize.literal('"mccCode"'), 'Mcc Code'],
            [Sequelize.literal('"mccMobile"'), 'Mcc Rep Mobile'],
            [Sequelize.literal('"plateCode"'), 'Plant Code'],
            [Sequelize.literal('"regionName"'), 'Region Name'],
            [Sequelize.literal('"unitName"'), 'Unit Name'],
            [Sequelize.literal('"mccName"'), 'Mcc Name'],
            [Sequelize.literal('"plateName"'), 'Plant Name'],
            [Sequelize.literal('"stateName"'), 'State Name'],
            [Sequelize.literal('"districtName"'), 'District Name'],
            [Sequelize.literal('"mendalName"'), 'Mandal Name'],
            [Sequelize.literal('"panchayatName"'), 'Panchayat Name'],
            [Sequelize.literal('"villageName"'), 'Village Name'],
            [Sequelize.literal('"isVerified"'), 'isVerified'],
            [Sequelize.literal('"password"'), 'Password'],
            [Sequelize.literal('"firebaseToken"'), 'Firebase Token'],
            [Sequelize.literal('"createdAt"'), 'Created At'],
            [Sequelize.literal('"updatedAt"'), 'Updated At'],
          ],
        });

        return data;
      }
    }

    if (regionName !== 'HYDERABAD') {
      if (value === 'waiting') {
        const data = await Farmer.findAll({
          where: { regionName, [Op.or]: [{ status: 'waiting' }, { status: 'confirmed' }] },
          attributes: [
            [Sequelize.literal('"id"'), 'User ID'],
            [Sequelize.literal('"profilePicture"'), 'ProfilePicture'],
            [Sequelize.literal('"role"'), 'User Type'],
            [Sequelize.literal('"status"'), 'Registration Status'],
            [Sequelize.literal('"steps"'), 'Steps No'],
            [Sequelize.literal('"appVersion"'), 'App Version'],
            [Sequelize.literal('"farmerName"'), 'Farmer Name'],
            [Sequelize.literal('"gender"'), 'Gender'],
            [Sequelize.literal('"age"'), 'Age'],
            [Sequelize.literal('"phone"'), 'Phone Number'],
            [Sequelize.literal('"userCode"'), 'User Code'],
            [Sequelize.literal('"pinCode"'), 'Pin Code'],
            [Sequelize.literal('"unitCode"'), 'Unit Code'],
            [Sequelize.literal('"mccCode"'), 'Mcc Code'],
            [Sequelize.literal('"mccMobile"'), 'Mcc Rep Mobile'],
            [Sequelize.literal('"plateCode"'), 'Plant Code'],
            [Sequelize.literal('"regionName"'), 'Region Name'],
            [Sequelize.literal('"unitName"'), 'Unit Name'],
            [Sequelize.literal('"mccName"'), 'Mcc Name'],
            [Sequelize.literal('"plateName"'), 'Plant Name'],
            [Sequelize.literal('"stateName"'), 'State Name'],
            [Sequelize.literal('"districtName"'), 'District Name'],
            [Sequelize.literal('"mendalName"'), 'Mandal Name'],
            [Sequelize.literal('"panchayatName"'), 'Panchayat Name'],
            [Sequelize.literal('"villageName"'), 'Village Name'],
            [Sequelize.literal('"isVerified"'), 'isVerified'],
            [Sequelize.literal('"password"'), 'Password'],
            [Sequelize.literal('"firebaseToken"'), 'Firebase Token'],
            [Sequelize.literal('"createdAt"'), 'Created At'],
            [Sequelize.literal('"updatedAt"'), 'Updated At'],
          ],
        });

        return data;
      }

      if (value === 'finished') {
        const data = await Farmer.findAll({
          where: { regionName, [Op.or]: [{ status: 'finished' }, { status: 'rejected' }] },
          attributes: [
            [Sequelize.literal('"id"'), 'User ID'],
            [Sequelize.literal('"profilePicture"'), 'ProfilePicture'],
            [Sequelize.literal('"role"'), 'User Type'],
            [Sequelize.literal('"status"'), 'Registration Status'],
            [Sequelize.literal('"steps"'), 'Steps No'],
            [Sequelize.literal('"appVersion"'), 'App Version'],
            [Sequelize.literal('"farmerName"'), 'Farmer Name'],
            [Sequelize.literal('"gender"'), 'Gender'],
            [Sequelize.literal('"age"'), 'Age'],
            [Sequelize.literal('"phone"'), 'Phone Number'],
            [Sequelize.literal('"userCode"'), 'User Code'],
            [Sequelize.literal('"pinCode"'), 'Pin Code'],
            [Sequelize.literal('"unitCode"'), 'Unit Code'],
            [Sequelize.literal('"mccCode"'), 'Mcc Code'],
            [Sequelize.literal('"mccMobile"'), 'Mcc Rep Mobile'],
            [Sequelize.literal('"plateCode"'), 'Plant Code'],
            [Sequelize.literal('"regionName"'), 'Region Name'],
            [Sequelize.literal('"unitName"'), 'Unit Name'],
            [Sequelize.literal('"mccName"'), 'Mcc Name'],
            [Sequelize.literal('"plateName"'), 'Plant Name'],
            [Sequelize.literal('"stateName"'), 'State Name'],
            [Sequelize.literal('"districtName"'), 'District Name'],
            [Sequelize.literal('"mendalName"'), 'Mandal Name'],
            [Sequelize.literal('"panchayatName"'), 'Panchayat Name'],
            [Sequelize.literal('"villageName"'), 'Village Name'],
            [Sequelize.literal('"isVerified"'), 'isVerified'],
            [Sequelize.literal('"password"'), 'Password'],
            [Sequelize.literal('"firebaseToken"'), 'Firebase Token'],
            [Sequelize.literal('"createdAt"'), 'Created At'],
            [Sequelize.literal('"updatedAt"'), 'Updated At'],
          ],
        });

        return data;
      }
    }

    return undefined;
  }

  static async adminReportFarmersByStatusAndRegionName(regionName) {
    if (regionName === 'HYDERABAD') {
      const data = await Farmer.findAll({
        attributes: [
          [Sequelize.literal('"id"'), 'User ID'],
          [Sequelize.literal('"profilePicture"'), 'ProfilePicture'],
          [Sequelize.literal('"role"'), 'User Type'],
          [Sequelize.literal('"status"'), 'Registration Status'],
          [Sequelize.literal('"steps"'), 'Steps No'],
          [Sequelize.literal('"appVersion"'), 'App Version'],
          [Sequelize.literal('"farmerName"'), 'Farmer Name'],
          [Sequelize.literal('"gender"'), 'Gender'],
          [Sequelize.literal('"age"'), 'Age'],
          [Sequelize.literal('"phone"'), 'Phone Number'],
          [Sequelize.literal('"userCode"'), 'User Code'],
          [Sequelize.literal('"pinCode"'), 'Pin Code'],
          [Sequelize.literal('"unitCode"'), 'Unit Code'],
          [Sequelize.literal('"mccCode"'), 'Mcc Code'],
          [Sequelize.literal('"mccMobile"'), 'Mcc Rep Mobile'],
          [Sequelize.literal('"plateCode"'), 'Plant Code'],
          [Sequelize.literal('"regionName"'), 'Region Name'],
          [Sequelize.literal('"unitName"'), 'Unit Name'],
          [Sequelize.literal('"mccName"'), 'Mcc Name'],
          [Sequelize.literal('"plateName"'), 'Plant Name'],
          [Sequelize.literal('"stateName"'), 'State Name'],
          [Sequelize.literal('"districtName"'), 'District Name'],
          [Sequelize.literal('"mendalName"'), 'Mandal Name'],
          [Sequelize.literal('"panchayatName"'), 'Panchayat Name'],
          [Sequelize.literal('"villageName"'), 'Village Name'],
          [Sequelize.literal('"isVerified"'), 'isVerified'],
          [Sequelize.literal('"password"'), 'Password'],
          [Sequelize.literal('"firebaseToken"'), 'Firebase Token'],
          [Sequelize.literal('"createdAt"'), 'Created At'],
          [Sequelize.literal('"updatedAt"'), 'Updated At'],
        ],
      });

      return data;
    }

    if (regionName !== 'HYDERABAD') {
      const data = await Farmer.findAll({
        where: { regionName },
        attributes: [
          [Sequelize.literal('"id"'), 'User ID'],
          [Sequelize.literal('"profilePicture"'), 'ProfilePicture'],
          [Sequelize.literal('"role"'), 'User Type'],
          [Sequelize.literal('"status"'), 'Registration Status'],
          [Sequelize.literal('"steps"'), 'Steps No'],
          [Sequelize.literal('"appVersion"'), 'App Version'],
          [Sequelize.literal('"farmerName"'), 'Farmer Name'],
          [Sequelize.literal('"gender"'), 'Gender'],
          [Sequelize.literal('"age"'), 'Age'],
          [Sequelize.literal('"phone"'), 'Phone Number'],
          [Sequelize.literal('"userCode"'), 'User Code'],
          [Sequelize.literal('"pinCode"'), 'Pin Code'],
          [Sequelize.literal('"unitCode"'), 'Unit Code'],
          [Sequelize.literal('"mccCode"'), 'Mcc Code'],
          [Sequelize.literal('"mccMobile"'), 'Mcc Rep Mobile'],
          [Sequelize.literal('"plateCode"'), 'Plant Code'],
          [Sequelize.literal('"regionName"'), 'Region Name'],
          [Sequelize.literal('"unitName"'), 'Unit Name'],
          [Sequelize.literal('"mccName"'), 'Mcc Name'],
          [Sequelize.literal('"plateName"'), 'Plant Name'],
          [Sequelize.literal('"stateName"'), 'State Name'],
          [Sequelize.literal('"districtName"'), 'District Name'],
          [Sequelize.literal('"mendalName"'), 'Mandal Name'],
          [Sequelize.literal('"panchayatName"'), 'Panchayat Name'],
          [Sequelize.literal('"villageName"'), 'Village Name'],
          [Sequelize.literal('"isVerified"'), 'isVerified'],
          [Sequelize.literal('"password"'), 'Password'],
          [Sequelize.literal('"firebaseToken"'), 'Firebase Token'],
          [Sequelize.literal('"createdAt"'), 'Created At'],
          [Sequelize.literal('"updatedAt"'), 'Updated At'],
        ],
      });

      return data;
    }

    return undefined;
  }

  static async adminReportCattlesByRegionName(regionName) {
    if (regionName === 'HYDERABAD') {
      const data = await Farmer.findAll({
        attributes: [['id', 'id'], ['farmerName', 'farmerName']],
        include: [{ model: Cattle, as: 'Cattle' }],
      });
      return data;
    }

    const data = await Farmer.findAll({
      where: { regionName },
      attributes: [['id', 'id'], ['farmerName', 'farmerName']],
      include: [{ model: Cattle, as: 'Cattle' }],
    });
    return data;
  }

  static async adminReportFeedbacksByRegionName(regionName) {
    if (regionName === 'HYDERABAD') {
      const data = await Farmer.findAll({
        attributes: [['id', 'id'], ['farmerName', 'farmerName']],
        include: [{ model: FarmerFeedback, as: 'FarmerFeedback' }],
      });
      return data;
    }

    const data = await Farmer.findAll({
      where: { regionName },
      attributes: [['id', 'id'], ['farmerName', 'farmerName']],
      include: [{ model: FarmerFeedback, as: 'FarmerFeedback' }],
    });
    return data;
  }

  static async adminReportConsultationsDetailsByRegionName(regionName) {
    if (regionName === 'HYDERABAD') {
      const data = await Farmer.findAll({
        attributes: [['id', 'id'], ['farmerName', 'farmerName']],
        include: [{ model: Medical, as: 'Medical' }],
      });
      return data;
    }

    const data = await Farmer.findAll({
      where: { regionName },
      attributes: [['id', 'id'], ['farmerName', 'farmerName']],
      include: [{ model: Medical, as: 'Medical' }],
    });
    return data;
  }
}

export default AdminHelpers;
