import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from 'http-status';

import resetCodeHelper from '../Helpers/resetCodeHelper';
import responseHelper from '../Helpers/responseHelper';
import sessionHelper from '../Helpers/sessionHelper';
import doctorHelper from '../Helpers/doctorHelper';
import farmerHelper from '../Helpers/farmerHelper';
import adminHelper from '../Helpers/adminHelper';

dotenv.config();

const farmerIsVerified = async (req, res, next) => {
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

const doctorIsVerified = async (req, res, next) => {
  try {
    const doctorExist = await doctorHelper.doctorExist('email', req.body.email);
    if (doctorExist) {
      if (doctorExist.status !== 'confirmed') {
        responseHelper.handleError(UNAUTHORIZED, `Doctor account is ${doctorExist.status}`);
        return responseHelper.response(res);
      }
      req.doctor = doctorExist;
      return next();
    }

    responseHelper.handleError(NOT_FOUND, 'Account not found, Check email and password.');
    return responseHelper.response(res);
  } catch (error) {
    responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseHelper.response(res);
  }
};

const adminIsVerified = async (req, res, next) => {
  try {
    const adminExist = await adminHelper.adminExist('email', req.body.email);
    if (adminExist) {
      req.admin = adminExist;
      return next();
    }

    responseHelper.handleError(NOT_FOUND, 'Account not found, Check email and password.');
    return responseHelper.response(res);
  } catch (error) {
    responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseHelper.response(res);
  }
};

const verifySesion = async (req, res, next) => {
  try {
    const verify = jwt.verify(req.header('session'), process.env.SECRET_KEY);
    const farmerExist = await farmerHelper.farmerExist('id', verify.farmerId);
    const sessionExist = await sessionHelper.farmerSessionExist('session', req.header('session'));

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

const verifyDoctorSession = async (req, res, next) => {
  try {
    const verify = jwt.verify(req.header('session'), process.env.SECRET_KEY);
    const doctorExist = await doctorHelper.doctorExist('id', verify.doctorId);
    const sessionExist = await sessionHelper.doctorSessionExist('session', req.header('session'));

    if (doctorExist) {
      if (sessionExist) {
        req.doctor = doctorExist;
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

const verifyAdminSession = async (req, res, next) => {
  try {
    const verify = jwt.verify(req.header('session'), process.env.SECRET_KEY);
    const adminExist = await adminHelper.adminExist('id', verify.adminId);
    const sessionExist = await sessionHelper.adminSessionExist('session', req.header('session'));

    if (adminExist) {
      if (sessionExist) {
        req.admin = adminExist;
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

const verifyCode = async (req, res, next) => {
  try {
    const codeExist = await resetCodeHelper.codeExist('code', req.body.verificationCode);
    if (codeExist) {
      const farmerExist = await farmerHelper.farmerExist('id', codeExist.farmerId);
      if (farmerExist) {
        if (codeExist.farmerId === farmerExist.id) {
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

const verifySignupOTP = async (req, res, next) => {
  try {
    const codeExist = await resetCodeHelper.codeExist('code', req.body.verificationCode);
    if (codeExist) {
      if (codeExist.phone === req.body.phone) {
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

export { farmerIsVerified, doctorIsVerified, adminIsVerified, verifyCode, verifySesion, verifyDoctorSession, verifyAdminSession, verifySignupOTP };
