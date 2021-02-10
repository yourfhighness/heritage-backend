import Router from 'express';
import multiparty from 'connect-multiparty';
import auth from '../controllers/authController';
import { verifyCode, accountIsVerified, verifySignupOTP } from '../middlewares/verifyMiddlewares';
import {
  validateLogin,
  validateRegisterFarmer,
  validatePassword,
  validateSignupOTP,
  validateResetLink,
  validateResetCode,
} from '../middlewares/schemaMiddleware';

const multipart = multiparty();
const authRouter = Router();
authRouter
  .post('/reset-otp', validateResetLink, auth.requestOTP)
  .get('/verify-otp', validateSignupOTP, verifySignupOTP, auth.verifyOTP)
  .post('/login-farmer', validateLogin, accountIsVerified, auth.loginFamer)
  .post('/reset-password', validatePassword, verifyCode, auth.resetPassword)
  .post('/reset-userCode', validateResetCode, verifyCode, auth.resetUserCode)
  .post('/register-farmer', multipart, validateRegisterFarmer, auth.registerFamer);

export default authRouter;
