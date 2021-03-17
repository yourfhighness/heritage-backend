import { Op } from 'sequelize';
import models from '../database/models';
import passwordHelper from './passwordHelper';

const { Farmer, FarmerFeedback, SemiVerifiedFarmer, RegionUnitMccname } = models;

class FarmerHelpers {
  static async farmerExist(attribute, value) {
    const viewedData = await Farmer.findOne({ where: { [attribute]: value } });
    return viewedData;
  }

  static async searchFarmer(phone, regionName, status) {
    let viewedData;
    if (regionName === 'HYDERABAD') {
      viewedData = await Farmer.findOne({ where: { [Op.and]: [{ phone }, { status }] } });
    }

    if (regionName !== 'HYDERABAD') {
      viewedData = await Farmer.findOne({ where: { [Op.and]: [{ phone }, { regionName }, { status }] } });
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
      status: body.status,
      steps: body.steps,
      farmerName: body.farmerName,
      gender: body.gender,
      age: body.age,
      phone: body.phone,
      unitName: body.unitName ? body.unitName.toUpperCase() : body.unitName,
      mccName: body.mccName ? body.mccName.toUpperCase() : body.mccName,
      mccCode: body.mccCode,
      userCode: body.userCode,
      regionName: body.regionName ? body.regionName.toUpperCase() : body.regionName,
      pinCode: body.pinCode,
      isVerified: true,
      password: passwordHelper.hashPassword(body.password),
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
    if (body.pinCode && body.unitName && body.mccName && !body.regionName) {
      const data = await RegionUnitMccname.findOne({ where: { [Op.and]: [{ pinCode: body.pinCode }, { unitName: body.unitName }, { mccName: body.mccName }] } });

      const updateFarmer = await Farmer.update({
        profilePicture,
        steps: body.steps,
        farmerName: body.farmerName,
        gender: body.gender,
        age: body.age,
        phone: body.phone,
        unitName: body.unitName ? body.unitName.toUpperCase() : body.unitName,
        mccName: body.mccName ? body.mccName.toUpperCase() : body.mccName,
        mccCode: body.mccCode,
        userCode: body.petWeight,
        regionName: data.regionName ? data.regionName.toUpperCase() : data.regionName,
        pinCode: body.pinCode,
        isVerified: body.isVerified,
        password: body.password ? passwordHelper.hashPassword(body.password) : existingPassword,
      }, { where: { id } });

      if (updateFarmer) {
        const farmer = await this.farmerExist('id', id);
        return farmer;
      }
      return null;
    }

    const updateFarmer = await Farmer.update({
      profilePicture,
      steps: body.steps,
      farmerName: body.farmerName,
      gender: body.gender,
      age: body.age,
      phone: body.phone,
      unitName: body.unitName ? body.unitName.toUpperCase() : body.unitName,
      mccName: body.mccName ? body.mccName.toUpperCase() : body.mccName,
      mccCode: body.mccCode,
      userCode: body.petWeight,
      regionName: body.regionName ? body.regionName.toUpperCase() : body.regionName,
      pinCode: body.pinCode,
      isVerified: body.isVerified,
      password: body.password ? passwordHelper.hashPassword(body.password) : existingPassword,
    }, { where: { id } });

    if (updateFarmer) {
      const farmer = await this.farmerExist('id', id);
      return farmer;
    }
    return null;
  }
}

export default FarmerHelpers;
