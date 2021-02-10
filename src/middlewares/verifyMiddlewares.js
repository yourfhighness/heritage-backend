import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED, CONFLICT } from 'http-status';

import resetCodeHelper from '../Helpers/resetCodeHelper';
import responseHelper from '../Helpers/responseHelper';
import sessionHelper from '../Helpers/sessionHelper';
import farmerHelper from '../Helpers/farmerHelper';

dotenv.config();

const verifyCode = async (req, res, next) => {
  try {
    const codeExist = await resetCodeHelper.codeExist('code', req.body.verificationCode);
    if (codeExist) {
      const getFarmerId = await resetCodeHelper.optmiseCode(codeExist.code);
      if (codeExist.farmerId === parseInt(getFarmerId, 10)) {
        const farmerExist = await farmerHelper.farmerExist('id', codeExist.farmerId);
        if (farmerExist) {
          if (farmerExist.isVerified === false) {
            responseHelper.handleError(UNAUTHORIZED, 'Farmer is not verified, Please verify account before procced');
            return responseHelper.response(res);
          }
          req.farmer = farmerExist;
          req.code = codeExist;
          return next();
        }
      }
    }

    responseHelper.handleError(NOT_FOUND, 'Invalid or Expired verification code');
    return responseHelper.response(res);
  } catch (error) {
    responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseHelper.response(res);
  }
};

const verifySesion = async (req, res, next) => {
  try {
    const verify = jwt.verify(req.header('session'), process.env.SECRET_KEY);
    const farmerExist = await farmerHelper.farmerExist('phone', verify.phone);
    const sessionExist = await sessionHelper.sessionExist('session', req.header('session'));

    if (farmerExist) {
      if (sessionExist) {
        req.farmer = farmerExist;
        return next();
      }
      responseHelper.handleError(UNAUTHORIZED, 'Already logged out. Sign in and try again..');
      return responseHelper.response(res);
    }

    responseHelper.handleError(NOT_FOUND, 'Account not found,  Please create account and try again.');
    return responseHelper.response(res);
  } catch (error) {
    responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseHelper.response(res);
  }
};

const accountIsVerified = async (req, res, next) => {
  try {
    const farmerExist = await farmerHelper.farmerExist('phone', req.body.phone);
    if (farmerExist) {
      if (farmerExist.isVerified === false) {
        responseHelper.handleError(UNAUTHORIZED, 'Farmer is not verified, Please verify account before procced');
        return responseHelper.response(res);
      }
      req.farmer = farmerExist;
      return next();
    }

    responseHelper.handleError(NOT_FOUND, 'Account not found, Check phone and password.');
    return responseHelper.response(res);
  } catch (error) {
    responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseHelper.response(res);
  }
};

const verifySignupOTP = async (req, res, next) => {
  try {
    const codeExist = await resetCodeHelper.codeExist('code', req.body.verificationCode);
    if (codeExist) {
      if (codeExist.phone === req.body.phone) {
        const farmerExist = await farmerHelper.farmerExist('phone', req.body.phone);
        if (farmerExist) {
          responseHelper.handleError(CONFLICT, `Farmer with ${req.body.phone} exist`);
          return responseHelper.response(res);
        }
        req.code = codeExist;
        return next();
      }
    }

    responseHelper.handleError(NOT_FOUND, 'Invalid or Expired verification code');
    return responseHelper.response(res);
  } catch (error) {
    responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseHelper.response(res);
  }
};

export { verifyCode, verifySesion, accountIsVerified, verifySignupOTP };
