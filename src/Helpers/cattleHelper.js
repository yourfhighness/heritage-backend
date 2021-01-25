import models from '../database/models';

const { Cattle } = models;
class CattleHelpers {
  static async countMilking() {
    const retrievedData = await Cattle.count({ where: { category: 'milking' } });
    return retrievedData;
  }

  static async countHeifer() {
    const retrievedData = await Cattle.count({ where: { category: 'heifer' } });
    return retrievedData;
  }

  static async countDry() {
    const retrievedData = await Cattle.count({ where: { category: 'dry' } });
    return retrievedData;
  }

  static async countCalf() {
    const retrievedData = await Cattle.count({ where: { category: 'calf' } });
    return retrievedData;
  }
}

export default CattleHelpers;
