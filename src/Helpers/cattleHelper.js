import Sequelize, { Op } from 'sequelize';
import models from '../database/models';

const { Cattle, Milking, Slip } = models;
class CattleHelpers {
  static async cattleExist(attribute, value) {
    const cattle = await Cattle.findOne({
      where: { [attribute]: value },
      include:
        [
          {
            model: Milking,
            as: 'Milking',
          },
        ],
    });
    return cattle;
  }

  static async cattleDeleteExist(cattleId, farmerId) {
    const appointment = await Cattle.findOne({
      where: { [Op.and]: [{ id: cattleId }, { farmerId }] },
    });
    return appointment;
  }

  static async deleteCattle(cattleId) {
    await Cattle.destroy({ where: { id: cattleId } });
  }

  static async viewDailyCattleSlips(attribute, value) {
    const Start = new Date().setHours(0, 0, 0, 0);
    const now = new Date();
    const dailySlips = await Slip.findAll({
      where: { [Op.and]: [{ [attribute]: value }, { createdAt: {
        [Op.gt]: Start,
        [Op.lt]: now,
      } }] },
    });
    return dailySlips;
  }

  static async viewPeriodicallyCattleSlips(attribute, value, range, period) {
    const targetOne = new Date();
    targetOne.setDate(targetOne.getDate() - range);
    const startDate = targetOne.toISOString().split('T')[0];

    const targetTwo = new Date();
    targetTwo.setDate(targetTwo.getDate() + 1);
    const endDate = targetTwo.toISOString().split('T')[0];

    const weeklySlips = await Slip.findAll({
      where: {
        [Op.and]: [{ [attribute]: value },
          { createdAt: { [Op.gt]: startDate } },
          { createdAt: { [Op.lt]: endDate } }],
      },
      attributes: [[Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount'], [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalQuantity'], [Sequelize.fn('date_trunc', period, Sequelize.col('createdAt')), 'date']],
      group: ['date'],
    });
    return weeklySlips;
  }

  static async viewWeeklyCattleSlips(attribute, value) {
    const targetOne = new Date();
    targetOne.setDate(targetOne.getDate() - 6);
    const startDate = targetOne.toISOString().split('T')[0];

    const targetTwo = new Date();
    targetTwo.setDate(targetTwo.getDate() + 1);
    const endDate = targetTwo.toISOString().split('T')[0];

    const weeklySlips = await Slip.findAll({
      where: { [Op.and]: [{ [attribute]: value }, { createdAt: { [Op.gt]: startDate } }, { createdAt: { [Op.lt]: endDate } }] },
    });
    return weeklySlips;
  }

  static async viewMonthlyCattleSlips(attribute, value) {
    const targetOne = new Date();
    targetOne.setDate(targetOne.getDate() - 31);
    const startDate = targetOne.toISOString().split('T')[0];

    const targetTwo = new Date();
    targetTwo.setDate(targetTwo.getDate() + 1);
    const endDate = targetTwo.toISOString().split('T')[0];

    const weeklySlips = await Slip.findAll({
      where: { [Op.and]: [{ [attribute]: value }, { createdAt: { [Op.gt]: startDate } }, { createdAt: { [Op.lt]: endDate } }] },
    });
    return weeklySlips;
  }

  static async viewAnnualyCattleSlips(attribute, value) {
    const targetOne = new Date();
    targetOne.setDate(targetOne.getDate() - 365);
    const startDate = targetOne.toISOString().split('T')[0];

    const targetTwo = new Date();
    targetTwo.setDate(targetTwo.getDate() + 1);
    const endDate = targetTwo.toISOString().split('T')[0];

    const weeklySlips = await Slip.findAll({
      where: { [Op.and]: [{ [attribute]: value }, { createdAt: { [Op.gt]: startDate } }, { createdAt: { [Op.lt]: endDate } }] },
    });
    return weeklySlips;
  }

  static async viewCattleAllSlips(attribute, value) {
    const allSlips = await Slip.findAll({ where: { [attribute]: value } });
    return allSlips;
  }

  static async filterCattleSlips(attribute, value, from, to) {
    const Start = new Date(from).setHours(0, 0, 0, 0);

    const targetOne = new Date(to);
    targetOne.setDate(targetOne.getDate() + 1);
    const endDate = targetOne.toISOString().split('T')[0];

    const filteredGroupSlips = await Slip.findAll({
      where: { [Op.and]: [{ [attribute]: value }, { createdAt: { [Op.gt]: Start, [Op.lt]: endDate } }] },

      attributes: [[Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount'], [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalQuantity'], [Sequelize.fn('date_trunc', 'day', Sequelize.col('createdAt')), 'date']],
      group: ['date'],
    });

    const filteredUngroupSlips = await Slip.findAll({
      where: { [Op.and]: [{ [attribute]: value }, { createdAt: { [Op.gt]: Start, [Op.lt]: endDate } }] },

      attributes: ['shift', 'quantity', 'amount', [Sequelize.fn('date_trunc', 'day', Sequelize.col('createdAt')), 'date']],
    });

    return { filteredGroupSlips, filteredUngroupSlips };
  }

  static async viewCattleSlips(attribute, value) {
    const targetOne = new Date();
    targetOne.setDate(targetOne.getDate() - 365);
    const startDate = targetOne.toISOString().split('T')[0];

    const targetTwo = new Date();
    targetTwo.setDate(targetTwo.getDate() + 1);
    const endDate = targetTwo.toISOString().split('T')[0];

    const weeklySlips = await Slip.findAll({
      where: { [Op.and]: [{ [attribute]: value }, { createdAt: { [Op.gt]: startDate } }, { createdAt: { [Op.lt]: endDate } }] },
    });
    return weeklySlips;
  }

  static async viewAllCattle(attribute, value) {
    const allSlips = await Cattle.findAll({ where: { [attribute]: value } });
    return allSlips;
  }

  static async saveCattle(cattle, profilePicture, farmerId) {
    const savedCattle = await Cattle.create({
      profilePicture,
      farmerId,
      status: cattle.status,
      cattle: cattle.cattle,
      cattleUID: cattle.cattleUID,
      cattleName: cattle.cattleName,
      category: cattle.category,
      age: cattle.age,
      breed: cattle.breed,
      weight: cattle.weight,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedMilking = await Milking.create({
      cattleId: savedCattle.id,
      milkProduction: cattle.milkProduction,
      fatInMilk: cattle.fatInMilk,
      pregnantMonth: cattle.pregnantMonth,
      LactationNumber: cattle.LactationNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (savedCattle && savedMilking) {
      const updatedCattle = await this.cattleExist('id', savedCattle.id);
      return updatedCattle;
    }

    return null;
  }

  static async slipExist(attribute, value) {
    const slip = await Slip.findOne({ where: { [attribute]: value } });
    return slip;
  }

  static async saveCattleSlip(slip, farmerId, cattleId) {
    const saveSlip = await Slip.create({
      farmerId,
      cattleId: cattleId || null,
      shift: slip.shift,
      quantity: slip.quantity,
      fat: slip.fat,
      snf: slip.snf,
      amount: slip.amount,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return saveSlip;
  }

  static async updateCattleProfile(cattleId, profilePicture, cattle) {
    const updateCattle = await Cattle.update({
      profilePicture,
      status: cattle.status,
      cattle: cattle.cattle,
      cattleUID: cattle.cattleUID,
      cattleName: cattle.cattleName,
      category: cattle.category,
      age: cattle.age,
      breed: cattle.breed,
      weight: cattle.weight,
    }, { where: { id: cattleId } });

    const updateMilking = await Milking.update({
      milkProduction: cattle.milkProduction,
      fatInMilk: cattle.fatInMilk,
      pregnantMonth: cattle.pregnantMonth,
      LactationNumber: cattle.LactationNumber,
    }, { where: { cattleId } });

    if (updateCattle && updateMilking) {
      const updatedCattle = await this.cattleExist('id', cattleId);
      return updatedCattle;
    }

    return null;
  }

  static async updateCattleSlip(slipId, slip) {
    const updatedSlip = await Slip.update({
      shift: slip.shift,
      quantity: slip.quantity,
      fat: slip.fat,
      snf: slip.snf,
      amount: slip.amount,
    }, { where: { id: slipId } });

    if (updatedSlip) { return this.slipExist('id', slipId); }
    return null;
  }

  static async deleteCattleSlip(slipId) {
    await Slip.destroy({ where: { id: slipId } });
  }

  static async countMilking(attribute, value) {
    const retrievedData = await Cattle.count({ where: { [Op.and]: [{ [attribute]: value }, { category: 'milking' }] } });
    return retrievedData;
  }

  static async countHeifer(attribute, value) {
    const retrievedData = await Cattle.count({ where: { [Op.and]: [{ [attribute]: value }, { category: 'heifer' }] } });
    return retrievedData;
  }

  static async countDry(attribute, value) {
    const retrievedData = await Cattle.count({ where: { [Op.and]: [{ [attribute]: value }, { category: 'dry' }] } });
    return retrievedData;
  }

  static async countCalf(attribute, value) {
    const retrievedData = await Cattle.count({ where: { [Op.and]: [{ [attribute]: value }, { category: 'calf' }] } });
    return retrievedData;
  }
}

export default CattleHelpers;
