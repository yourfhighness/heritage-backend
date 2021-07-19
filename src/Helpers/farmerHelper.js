import Sequelize, { Op } from 'sequelize';
import models from '../database/models';
import passwordHelper from './passwordHelper';

const { Farmer, ResetCode, FarmerSession, Cattle, Milking, Slip, Appointment, Medical, FarmerFeedback, SemiVerifiedFarmer, RegionUnitMccname } = models;

class FarmerHelpers {
  static async farmerExist(attribute, value) {
    const viewedData = await Farmer.findOne({ where: { [attribute]: value } });
    return viewedData;
  }

  static async countData(value, regionName) {
    if (regionName === 'HYDERABAD') {
      const data = await Farmer.count({ where: { role: value } });
      return data;
    }

    const data = await Farmer.count({ where: { role: value, regionName } });
    return data;
  }

  static async countCattles(regionName) {
    if (regionName === 'HYDERABAD') {
      const data = await Farmer.findAll({
        attributes: [['id', 'id'], ['farmerName', 'farmerName'], [Sequelize.fn("COUNT", Sequelize.col("Cattle.farmerId")), "cattlesCount"]],
        include: [{ model: Cattle, as: 'Cattle', attributes: [] }],
        group: ['Farmer.id'],
      });
      return data;
    }

    const data = await Farmer.findAll({
      where: { regionName },
      attributes: [['id', 'id'], ['farmerName', 'farmerName'], [Sequelize.fn("COUNT", Sequelize.col("Cattle.farmerId")), "cattlesCount"]],
      include: [{ model: Cattle, as: 'Cattle', attributes: [] }],
      group: ['Farmer.id'],
    });

    return data;
  }

  static async farmerRegionExist(phone, regionName) {
    if (regionName === 'HYDERABAD') {
      const data = await Farmer.findOne({ where: { phone } });
      return data;
    }

    if (regionName !== 'HYDERABAD') {
      const data = await Farmer.findOne({ where: { phone, regionName } });
      return data;
    }

    return null;
  }

  static async searchFarmer(phone, regionName, status) {
    let viewedData;
    if (!status) {
      if (regionName === 'HYDERABAD') {
        viewedData = await Farmer.findOne({
          where: { [Op.and]: [{ phone }] },
          include: [{ model: Cattle, as: 'Cattle' }],
        });
      }

      if (regionName !== 'HYDERABAD') {
        viewedData = await Farmer.findOne({
          where: { [Op.and]: [{ phone }, { regionName }] },
          include: [{ model: Cattle, as: 'Cattle' }],
        });
      }

      return viewedData;
    }

    if (regionName === 'HYDERABAD') {
      viewedData = await Farmer.findOne({
        where: { [Op.and]: [{ phone }, { status }] },
        include: [{ model: Cattle, as: 'Cattle' }],
      });
    }

    if (regionName !== 'HYDERABAD') {
      viewedData = await Farmer.findOne({
        where: { [Op.and]: [{ phone }, { regionName }, { status }] },
        include: [{ model: Cattle, as: 'Cattle' }],
      });
    }

    return viewedData;
  }

  static async semiVerifiedFarmerExist(attribute, value) {
    const viewedSemiVerifiedFarmer = await SemiVerifiedFarmer.findOne({ where: { [attribute]: value } });
    if (viewedSemiVerifiedFarmer) {
      const viewedRegionUnitMccname = await RegionUnitMccname.findOne({ where: { [Op.and]: [{ regionName: viewedSemiVerifiedFarmer.regionName }, { unitName: viewedSemiVerifiedFarmer.unitName }] } });
      const data = { semiVeriedFarmer: viewedSemiVerifiedFarmer, regionUnitMccname: viewedRegionUnitMccname };
      return data;
    }
    return null;
  }

  static async savefarmer(profilePicture, body) {
    const farmer = await Farmer.create({
      profilePicture,
      role: body.role,
      assigned: body.assigned,
      status: body.status,
      steps: body.steps,
      appVersion: body.appVersion,
      appLanguage: body.appLanguage,
      farmerName: body.farmerName,
      gender: body.gender,
      age: body.age,
      phone: body.phone,
      userCode: body.userCode,
      pinCode: body.pinCode,
      unitCode: body.unitCode,
      mccCode: body.mccCode,
      mccMobile: body.mccMobile,
      plateCode: body.plateCode,
      regionName: body.regionName ? body.regionName.toUpperCase() : body.regionName,
      unitName: body.unitName ? body.unitName.toUpperCase() : body.unitName,
      mccName: body.mccName ? body.mccName.toUpperCase() : body.mccName,
      plateName: body.plateName ? body.plateName.toUpperCase() : body.plateName,
      stateName: body.stateName ? body.stateName.toUpperCase() : body.stateName,
      districtName: body.districtName ? body.districtName.toUpperCase() : body.districtName,
      mendalName: body.mendalName ? body.mendalName.toUpperCase() : body.mendalName,
      panchayatName: body.panchayatName ? body.panchayatName.toUpperCase() : body.panchayatName,
      villageName: body.villageName ? body.villageName.toUpperCase() : body.villageName,
      isVerified: true,
      password: passwordHelper.hashPassword(body.password),
      firebaseToken: body.firebaseToken,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return farmer;
  }

  static async saveSemiVerifiedFarmer(body) {
    const savedData = await Promise.all(body.farmerName.map(async (element) => {
      const data = await SemiVerifiedFarmer.create({
        profilePicture: 'https://res.cloudinary.com/your-highness/image/upload/v1616590385/trajvkwdhbbip77pbyuv.jpg',
        status: 'confirmed',
        farmerName: body.farmerName[body.farmerName.indexOf(element)],
        nomineeName: body.nomineeName[body.farmerName.indexOf(element)],
        gender: body.gender[body.farmerName.indexOf(element)],
        age: body.age[body.farmerName.indexOf(element)],
        phone: body.phone[body.farmerName.indexOf(element)],
        Occupation: body.Occupation[body.farmerName.indexOf(element)],
        MonthlyIncome: body.MonthlyIncome[body.farmerName.indexOf(element)],
        cardNo: body.cardNo[body.cardNo.indexOf(element)],
        enrollmentID: body.enrollmentID[body.farmerName.indexOf(element)],
        paymentDone: body.paymentDone[body.farmerName.indexOf(element)],
        unitName: body.unitName[body.farmerName.indexOf(element)],
        mccName: body.mccName[body.farmerName.indexOf(element)],
        regionName: body.regionName[body.farmerName.indexOf(element)],
        pinCode: body.pinCode[body.farmerName.indexOf(element)],
        mccCode: body.mccCode[body.farmerName.indexOf(element)],
        userCode: body.userCode[body.farmerName.indexOf(element)],
        isVerified: true,
        password: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return data;
    }));

    return savedData;
  }

  static async saveFeedback(farmerId, feedback) {
    const savedData = await FarmerFeedback.create({
      farmerId,
      feedback,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return savedData;
  }

  static async updateFarmer(newAttribute, newValue, attribute, value) {
    const updatedData = await Farmer.update({ [newAttribute]: newValue }, { where: { [attribute]: value } });
    if (updatedData) {
      const viewedData = await this.farmerExist(attribute, value);
      return viewedData;
    }
    return null;
  }

  static async updateFarmerProfile(id, profilePicture, body, existingPassword) {
    const updateFarmer = await Farmer.update({
      role: body.role,
      assigned: body.assigned,
      status: body.status,
      profilePicture,
      steps: body.steps,
      appVersion: body.appVersion,
      appLanguage: body.appLanguage,
      farmerName: body.farmerName,
      gender: body.gender,
      age: body.age,
      phone: body.phone,
      userCode: body.userCode,
      pinCode: body.pinCode,
      unitCode: body.unitCode,
      mccCode: body.mccCode,
      mccMobile: body.mccMobile,
      plateCode: body.plateCode,
      regionName: body.regionName ? body.regionName.toUpperCase() : body.regionName,
      unitName: body.unitName ? body.unitName.toUpperCase() : body.unitName,
      mccName: body.mccName ? body.mccName.toUpperCase() : body.mccName,
      plateName: body.plateName ? body.plateName.toUpperCase() : body.plateName,
      stateName: body.stateName ? body.stateName.toUpperCase() : body.stateName,
      districtName: body.districtName ? body.districtName.toUpperCase() : body.districtName,
      mendalName: body.mendalName ? body.mendalName.toUpperCase() : body.mendalName,
      panchayatName: body.panchayatName ? body.panchayatName.toUpperCase() : body.panchayatName,
      villageName: body.villageName ? body.villageName.toUpperCase() : body.villageName,
      isVerified: body.isVerified,
      password: body.password ? passwordHelper.hashPassword(body.password) : existingPassword,
      firebaseToken: body.firebaseToken,
    }, { where: { id } });

    if (updateFarmer) {
      const farmer = await this.farmerExist('id', id);
      return farmer;
    }

    return null;
  }

  static async resetFarmer(value) {
    await Farmer.destroy({ where: { id: value } });
    await Medical.destroy({ where: { farmerId: value } });
    await ResetCode.destroy({ where: { farmerId: value } });
    await Appointment.destroy({ where: { farmerId: value } });
    await FarmerSession.destroy({ where: { farmerId: value } });

    const cattles = await Cattle.findAll({ where: { farmerId: value } });
    if (cattles.length > 0) {
      await Cattle.destroy({ where: { farmerId: value } });
      cattles.map(async (cattle) => {
        await Milking.destroy({ where: { cattleId: cattle.id } });
        await Slip.destroy({ where: { cattleId: cattle.id } });
      });
    }
  }

  static async removeAllFrmers(field, value) {
    await Farmer.destroy({ where: { [field]: value } });
  }
}

export default FarmerHelpers;
