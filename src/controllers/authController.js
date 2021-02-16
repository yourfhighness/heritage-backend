import { INTERNAL_SERVER_ERROR, UNAUTHORIZED, SERVICE_UNAVAILABLE, BAD_REQUEST, CONFLICT, NOT_FOUND, CREATED, OK } from 'http-status';

import { sendSMSJsonAPI } from '../services/sendSMSNimbusit';
import resetCodeHelper from '../Helpers/resetCodeHelper';
import imageService from '../services/cloudinaryHelper';
import responseHelper from '../Helpers/responseHelper';
import passwordHelper from '../Helpers/passwordHelper';
import sessionHelper from '../Helpers/sessionHelper';
import farmerHelper from '../Helpers/farmerHelper';

class AuthController {
  static async registerFamer(req, res) {
    try {
      const phoneExist = await farmerHelper.farmerExist('phone', req.body.phone);

      if (phoneExist) {
        responseHelper.handleError(CONFLICT, `Farmer with ${req.body.phone} exist`);
        return responseHelper.response(res);
      }

      if (!req.files || !req.files.profilePicture || req.files.profilePicture.length < 1) {
        responseHelper.handleError(BAD_REQUEST, 'Profile picture is required.');
        return responseHelper.response(res);
      }

      const document = await imageService(req.files.profilePicture);
      if (document === 'Error' || document === undefined) {
        responseHelper.handleError(BAD_REQUEST, 'Please check good internet and use correct type of files(jpg, png or pdf).');
        return responseHelper.response(res);
      }

      await resetCodeHelper.expireCode('phone', req.body.phone);
      const farmer = await farmerHelper.savefarmer(document, req.body);
      if (farmer) {
        const data = {
          session: await sessionHelper.generateFarmerSession(farmer.id, farmer.farmerName, farmer.userCode, farmer.phone, farmer.isVerified),
          farmer,
        };

        responseHelper.handleSuccess(CREATED, 'Farmer registered successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async loginFamer(req, res) {
    try {
      const passwordExist = await passwordHelper.checkPassword(req.body.password, req.farmer.password);
      if (!passwordExist) {
        responseHelper.handleError(UNAUTHORIZED, 'Phone or password incorrect');
        return responseHelper.response(res);
      }

      if (passwordExist) {
        const data = {
          session: await sessionHelper.generateFarmerSession(req.farmer.id, req.farmer.farmerName, req.farmer.userCode, req.farmer.phone, req.farmer.isVerified),
          farmer: req.farmer,
        };

        responseHelper.handleSuccess(OK, 'Farmer logged in successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async resetOTP(req, res) {
    try {
      const phoneExist = await farmerHelper.farmerExist('phone', req.body.phone);

      if (!phoneExist) {
        responseHelper.handleError(NOT_FOUND, `Phone ${req.body.phone} not exist`);
        return responseHelper.response(res);
      }

      if (phoneExist) {
        const code = await resetCodeHelper.generateCode(phoneExist.id, phoneExist.phone);
        const sentSMS = await sendSMSJsonAPI(req.body.phone.replace(/\D/g, '').slice(-10), `Hi ${phoneExist.farmerName || 'User'}, `, code);

        if (sentSMS) {
          responseHelper.handleSuccess(OK, 'OTP SMS sent successfully');
          return responseHelper.response(res);
        }
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async verificationOTP(req, res) {
    try {
      const phoneExist = await farmerHelper.farmerExist('phone', req.body.phone);

      if (phoneExist) {
        responseHelper.handleError(CONFLICT, `Farmer with ${req.body.phone} exist`);
        return responseHelper.response(res);
      }

      if (!phoneExist) {
        const code = await resetCodeHelper.generateCode(0, req.body.phone);
        const sentSMS = await sendSMSJsonAPI(req.body.phone.replace(/\D/g, '').slice(-10), 'Hi User', code);

        if (sentSMS.data.Status === 'OK') {
          responseHelper.handleSuccess(OK, 'OTP SMS sent successfully');
          return responseHelper.response(res);
        }

        if (sentSMS.data.Status !== 'OK') {
          responseHelper.handleSuccess(BAD_REQUEST, sentSMS.data.Response.Message);
          return responseHelper.response(res);
        }
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async verifyOTP(req, res) {
    try {
      responseHelper.handleSuccess(OK, 'Farmer phone numnber verified successfully');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async verifyVerificationOTP(req, res) {
    try {
      await resetCodeHelper.expireCode('code', req.body.verificationCode);
      responseHelper.handleSuccess(OK, 'Farmer phone numnber verified successfully');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async verifyResetOTP(req, res) {
    try {
      responseHelper.handleSuccess(OK, 'Farmer phone numnber verified successfully');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async resetPassword(req, res) {
    try {
      const updateFarmer = await farmerHelper.updateFarmer('password', passwordHelper.hashPassword(req.body.password), 'id', req.farmer.id);

      if (updateFarmer) {
        await resetCodeHelper.expireCode('code', req.body.verificationCode);
        responseHelper.handleSuccess(OK, 'Farmer password updated successfully');
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async resetUserCode(req, res) {
    try {
      let farmerExist = await farmerHelper.farmerExist('userCode', req.body.userCode);

      if (farmerExist) {
        const data = { userCode: req.farmer.userCode };
        await resetCodeHelper.expireCode(req.body.verificationCode);
        responseHelper.handleSuccess(OK, 'Farmer userCode updated successfully', data);
        return responseHelper.response(res);
      }

      if (!farmerExist) {
        const updateFarmer = await farmerHelper.updateFarmer('userCode', req.body.userCode, 'id', req.farmer.id);

        if (updateFarmer) {
          await resetCodeHelper.expireCode('code', req.body.verificationCode);
          farmerExist = await farmerHelper.farmerExist('userCode', req.body.userCode);
          const data = { userCode: farmerExist.userCode };
          responseHelper.handleSuccess(OK, 'Farmer userCode updated successfull', data);
          return responseHelper.response(res);
        }
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }
}

export default AuthController;
