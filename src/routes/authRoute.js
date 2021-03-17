import Router from 'express';
import multiparty from 'connect-multiparty';

import auth from '../controllers/authController';
import admin from '../controllers/adminController';
import doctor from '../controllers/doctorController';
import {
  verifyCode,
  verifySesion,
  verifySignupOTP,
  adminIsVerified,
  farmerIsVerified,
  doctorIsVerified,
  verifyAdminSession,
  verifyDoctorSession,
} from '../middlewares/verifyMiddlewares';

import {
  validateLogin,
  validatePassword,
  validateSignupOTP,
  validateResetLink,
  validateResetCode,
  validateRegisterFarmer,
  validateChangePassword,
  validateAdminAndDoctorLogin,
} from '../middlewares/schemaMiddleware';

const multipart = multiparty();
const authRouter = Router();

authRouter
  .post('/reset-otp', validateResetLink, auth.resetOTP)
  .patch('/reset-password', validatePassword, verifyCode, auth.resetPassword)
  .patch('/reset-userCode', validateResetCode, verifyCode, auth.resetUserCode)
  .patch('/change-password', verifySesion, validateChangePassword, auth.changePassword)

  .delete('/logout-farmer', verifySesion, auth.logoutFarmer)
  .delete('/logout-admin', verifyAdminSession, auth.logoutAdmin)
  .delete('/logout-doctor', verifyDoctorSession, auth.logoutDoctor)

  .post('/verification-otp', validateResetLink, auth.generateOTP)
  .post('/verify-otp', validateSignupOTP, verifySignupOTP, auth.verifyOTP)
  .post('/register-farmer', multipart, validateRegisterFarmer, auth.registerFamer)
  .post('/verify-reset-otp', validateSignupOTP, verifySignupOTP, auth.verifyResetOTP)

  .post('/login-farmer', validateLogin, farmerIsVerified, auth.loginFamer)
  .post('/login-admin', validateAdminAndDoctorLogin, adminIsVerified, admin.adminLogin)
  .post('/login-doctor', validateAdminAndDoctorLogin, doctorIsVerified, doctor.doctorLogin)
  .post('/verify-verification-otp', validateSignupOTP, verifySignupOTP, auth.verifyVerificationOTP);

export default authRouter;
