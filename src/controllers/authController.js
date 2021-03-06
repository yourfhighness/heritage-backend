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

      if (phoneExist && phoneExist.status !== 'rejected') {
        responseHelper.handleError(CONFLICT, `Farmer with ${req.body.phone} exist`);
        return responseHelper.response(res);
      }

      if (phoneExist && phoneExist.status === 'rejected') await farmerHelper.resetFarmer(phoneExist.id);

      let document = null;
      if (req.files && req.files.profilePicture) {
        document = await imageService(req.files.profilePicture);
        if (document === 'Error' || document === undefined) {
          responseHelper.handleError(BAD_REQUEST, 'Please check good internet and use correct type of files(jpg, png or pdf).');
          return responseHelper.response(res);
        }
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
        await farmerHelper.updateFarmer('appVersion', req.body.appVersion, 'id', req.farmer.id);

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

      const code = await resetCodeHelper.generateCode(phoneExist.id, phoneExist.phone);
      const sentSMS = await sendSMSJsonAPI(req.body.phone.replace(/\D/g, ''), `Dear User, Welcome to Heritage VET+. Your OTP is : ${code}`);

      if (sentSMS) {
        responseHelper.handleSuccess(OK, 'OTP SMS sent successfully');
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async generateOTP(req, res) {
    try {
      const phoneExist = await farmerHelper.farmerExist('phone', req.body.phone);

      if (phoneExist && phoneExist.status !== 'rejected') {
        responseHelper.handleError(CONFLICT, `Farmer with this ${req.body.phone} exist`);
        return responseHelper.response(res);
      }

      if (phoneExist && phoneExist.status === 'rejected') await farmerHelper.resetFarmer(phoneExist.id);

      const code = await resetCodeHelper.generateCode(0, req.body.phone);
      const sentSMS = await sendSMSJsonAPI(req.body.phone.replace(/\D/g, ''), `Dear User, Welcome to Heritage VET+. Your OTP is : ${code}`);

      if (sentSMS.data.Status === 'OK') {
        responseHelper.handleSuccess(OK, 'OTP SMS sent successfully');
        return responseHelper.response(res);
      }

      if (sentSMS.data.Status !== 'OK') {
        responseHelper.handleSuccess(BAD_REQUEST, sentSMS.data.Response.Message);
        return responseHelper.response(res);
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
      const data = await farmerHelper.semiVerifiedFarmerExist('phone', req.body.phone);
      responseHelper.handleSuccess(OK, 'Farmer phone numnber verified successfully', data);
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

  static async changePassword(req, res) {
    try {
      const passwordExist = await passwordHelper.checkPassword(req.body.oldPassword, req.farmer.password);
      if (!passwordExist) {
        responseHelper.handleError(UNAUTHORIZED, 'Exist password incorrect');
        return responseHelper.response(res);
      }
      const updateFarmer = await farmerHelper.updateFarmer('password', passwordHelper.hashPassword(req.body.password), 'id', req.farmer.id);
      if (updateFarmer) {
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

  static async logoutFarmer(req, res) {
    try {
      await sessionHelper.logoutFarmer(req.header('session'));
      responseHelper.handleSuccess(OK, 'Farmer logged out successfully');
      return responseHelper.response(res);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: error.toString(),
      });
    }
  }

  static async logoutDoctor(req, res) {
    try {
      await sessionHelper.logoutDoctor(req.header('session'));
      responseHelper.handleSuccess(OK, 'Doctor logged out successfully');
      return responseHelper.response(res);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: error.toString(),
      });
    }
  }

  static async logoutAdmin(req, res) {
    try {
      await sessionHelper.logoutAdmin(req.header('session'));
      responseHelper.handleSuccess(OK, 'Admin logged out successfully');
      return responseHelper.response(res);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: error.toString(),
      });
    }
  }

  static async phoneExsitInResetCodesTable(req, res) {
    try {
      const phoneExist = await resetCodeHelper.codeExist('phone', req.body.phone);

      if (!phoneExist) {
        responseHelper.handleError(NOT_FOUND, `Phone ${req.body.phone} not exist`);
        return responseHelper.response(res);
      }

      responseHelper.handleSuccess(OK, 'Phone found successfully', phoneExist);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }
}

export default AuthController;
