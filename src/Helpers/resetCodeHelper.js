import OPTCode from 'generate-sms-verification-code';
import models from '../database/models';

const { ResetCode } = models;

class ResetCodeHelpers {
  static async codeExist(attribute, value) {
    const resetCode = await ResetCode.findOne({ where: { [attribute]: value } });
    return resetCode;
  }

  static async expireCode(code) {
    const ExpiredCode = await ResetCode.destroy({ where: { code } });
    return ExpiredCode;
  }

  static async renewCode(newCode, oldCode) {
    const renewedCode = await ResetCode.update({ code: newCode }, { where: { code: oldCode } });
    return renewedCode;
  }

  static async saveCode(farmerId, phone, code) {
    await ResetCode.create({
      farmerId,
      phone,
      code,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static async generateCode(farmerId, phone) {
    const codeExist = await this.codeExist('farmerId', farmerId);
    const generatedCode = OPTCode(8, { type: 'number' });

    if (codeExist) {
      this.renewCode(`${generatedCode}-${farmerId}`, codeExist.code);
      return `${generatedCode}-${farmerId}`;
    }

    await this.saveCode(farmerId, phone, `${generatedCode}-${farmerId}`);
    return `${generatedCode}-${farmerId}`;
  }

  static async optmiseCode(code) {
    const codeLength = code.length;
    const codePoint = code.lastIndexOf('-');
    return code.substring(codePoint, codeLength).replace(/-/g, '');
  }
}

export default ResetCodeHelpers;
