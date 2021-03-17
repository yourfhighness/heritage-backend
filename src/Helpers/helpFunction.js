import models from '../database/models';

const { Farmer } = models;

class HelpFunction {
  static async adminUpdateFarmer(attribute, newValue, oldValue) {
    const renewedCode = await Farmer.update({ [attribute]: newValue || null }, { where: { [attribute]: oldValue || null } });
    return renewedCode;
  }
}

export default HelpFunction;
