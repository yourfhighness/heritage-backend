import Router from 'express';
import multiparty from 'connect-multiparty';
import busboyBodyParser from 'busboy-body-parser';

import auth from '../controllers/authController';
import admin from '../controllers/adminController';
import doctor from '../controllers/doctorController';
import file from '../controllers/filePracticeController';
import {
  verifyCode,
  verifySignupOTP,
  adminIsVerified,
  farmerIsVerified,
  doctorIsVerified,
} from '../middlewares/verifyMiddlewares';

import {
  validateLogin,
  validateRegisterFarmer,
  validatePassword,
  validateSignupOTP,
  validateResetLink,
  validateResetCode,
  validateAdminAndDoctorLogin,
} from '../middlewares/schemaMiddleware';

const busboyBodyParse = busboyBodyParser({ multi: true });
const multipart = multiparty();
const authRouter = Router();

authRouter
  .post('/files', busboyBodyParse, file.uploadFile)

  .post('/reset-otp', validateResetLink, auth.resetOTP)
  .patch('/reset-password', validatePassword, verifyCode, auth.resetPassword)
  .patch('/reset-userCode', validateResetCode, verifyCode, auth.resetUserCode)

  .post('/verification-otp', validateResetLink, auth.verificationOTP)
  .post('/verify-otp', validateSignupOTP, verifySignupOTP, auth.verifyOTP)
  .post('/register-farmer', multipart, validateRegisterFarmer, auth.registerFamer)
  .post('/verify-reset-otp', validateSignupOTP, verifySignupOTP, auth.verifyResetOTP)

  .post('/login-farmer', validateLogin, farmerIsVerified, auth.loginFamer)
  .post('/login-admin', validateAdminAndDoctorLogin, adminIsVerified, admin.adminLogin)
  .post('/login-doctor', validateAdminAndDoctorLogin, doctorIsVerified, doctor.doctorLogin)
  .post('/verify-verification-otp', validateSignupOTP, verifySignupOTP, auth.verifyVerificationOTP);

export default authRouter;
