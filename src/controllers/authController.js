import { INTERNAL_SERVER_ERROR, UNAUTHORIZED, SERVICE_UNAVAILABLE, BAD_REQUEST, CREATED, OK } from 'http-status';

import resetCodeHelper from '../Helpers/resetCodeHelper';
import imageService from '../services/cloudinaryHelper';
import responseHelper from '../Helpers/responseHelper';
import passwordHelper from '../Helpers/passwordHelper';
import sessionHelper from '../Helpers/sessionHelper';
import farmerHelper from '../Helpers/farmerHelper';
import sendSMS from '../services/sendSMSTwilio';

class AuthController {
  static async registerFamer(req, res) {
    try {
      if (!req.files.profilePicture) {
        responseHelper.handleError(BAD_REQUEST, 'Please profile picture is required.');
        return responseHelper.response(res);
      }

      const document = await imageService(req.files.profilePicture);
      if (document === 'Error' || document === undefined) {
        responseHelper.handleError(BAD_REQUEST, 'Please check good internet and use correct type of files(jpg, png or pdf).');
        return responseHelper.response(res);
      }

      const farmer = await farmerHelper.savefarmer(document, req.body);
      if (farmer) {
        const data = {
          session: await sessionHelper.generateSession(farmer.id, farmer.farmerName, farmer.userCode, farmer.phone, farmer.isVerified),
          farmer: { id: farmer.id, farmerName: farmer.farmerName, userCode: farmer.userCode, phone: farmer.phone, verified: farmer.isVerified, profilePicture: farmer.profilePicture },
        };

        responseHelper.handleSuccess(CREATED, 'Farmer registered successfull', data);
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
          session: await sessionHelper.generateSession(req.farmer.id, req.farmer.farmerName, req.farmer.userCode, req.farmer.phone, req.farmer.isVerified),
          farmer: { id: req.farmer.id, farmerName: req.farmer.farmerName, userCode: req.farmer.userCode, phone: req.farmer.phone, verified: req.farmer.isVerified },
        };

        responseHelper.handleSuccess(OK, 'Farmer logged in successfull', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async requestOTP(req, res) {
    try {
      const phoneExist = await farmerHelper.farmerExist('phone', req.body.phone);

      if (phoneExist) {
        const code = await resetCodeHelper.generateCode(phoneExist.id, phoneExist.phone);
        const sentSMS = await sendSMS(req.body.phone, code);

        if (sentSMS) {
          responseHelper.handleSuccess(OK, 'Reset link generated successfull', code);
          return responseHelper.response(res);
        }
      }

      if (!phoneExist) {
        responseHelper.handleError(UNAUTHORIZED, `Farmer's phone doesn't exist`);
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
      responseHelper.handleSuccess(OK, 'Farmer phone numnber verified successfull');
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
        await resetCodeHelper.expireCode(req.body.verificationCode);
        responseHelper.handleSuccess(OK, 'Farmer password updated successfull');
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
        responseHelper.handleSuccess(OK, 'Farmer userCode updated successfull', data);
        return responseHelper.response(res);
      }

      if (!farmerExist) {
        const updateFarmer = await farmerHelper.updateFarmer('userCode', req.body.userCode, 'id', req.farmer.id);

        if (updateFarmer) {
          await resetCodeHelper.expireCode(req.body.verificationCode);
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
