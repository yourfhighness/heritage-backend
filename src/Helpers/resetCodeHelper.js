import OPTCode from 'generate-sms-verification-code';
import handleFourOTP from './handleFourOTP';
import models from '../database/models';

const { ResetCode } = models;

class ResetCodeHelpers {
  static async codeExist(attribute, value) {
    const resetCode = await ResetCode.findOne({ where: { [attribute]: value } });
    return resetCode;
  }

  static async expireCode(attribute, value) {
    const ExpiredCode = await ResetCode.destroy({ where: { [attribute]: value } });
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
    const codeExist = await this.codeExist('phone', phone);
    let generatedCode = OPTCode(4, { type: 'number' });

    generatedCode = await handleFourOTP(generatedCode);

    if (codeExist) {
      this.renewCode(`${generatedCode}`, codeExist.code);
      return `${generatedCode}`;
    }

    await this.saveCode(farmerId, phone, `${generatedCode}`);
    return `${generatedCode}`;
  }

  static async optmiseCode(code) {
    const codeLength = code.length;
    const codePoint = code.lastIndexOf('-');
    return code.substring(codePoint, codeLength).replace(/-/g, '');
  }
}

export default ResetCodeHelpers;
