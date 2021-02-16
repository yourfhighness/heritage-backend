import models from '../database/models';
import passwordHelper from './passwordHelper';

const { Farmer } = models;

class FarmerHelpers {
  static async farmerExist(attribute, value) {
    const farmer = await Farmer.findOne({ where: { [attribute]: value } });
    return farmer;
  }

  static async savefarmer(profilePicture, body) {
    const farmer = await Farmer.create({
      profilePicture,
      status: 'waiting',
      farmerName: body.farmerName,
      gender: body.gender,
      age: body.age,
      phone: body.phone,
      unitName: body.unitName,
      mccName: body.mccName,
      mccCode: body.mccCode,
      userCode: body.userCode,
      isVerified: true,
      password: passwordHelper.hashPassword(body.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return farmer;
  }

  static async updateFarmer(newAttribute, newValue, oldAttribute, oldValue) {
    const renewedCode = await Farmer.update({ [newAttribute]: newValue }, { where: { [oldAttribute]: oldValue } });
    return renewedCode;
  }

  static async updateFarmerProfile(id, profilePicture, body) {
    const updateFarmer = await Farmer.update({
      profilePicture,
      farmerName: body.farmerName,
      gender: body.gender,
      age: body.age,
      phone: body.phone,
      unitName: body.unitName,
      mccName: body.mccName,
      mccCode: body.mccCode,
      userCode: body.petWeight,
      isVerified: body.isVerified,
      password: passwordHelper.hashPassword(body.password),
    }, { where: { id } });

    if (updateFarmer) {
      const farmer = await this.farmerExist('id', id);
      return farmer;
    }

    return null;
  }
}

export default FarmerHelpers;
