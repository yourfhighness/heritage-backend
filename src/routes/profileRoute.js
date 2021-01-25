import Router from 'express';
import profile from '../controllers/profileController';

const profileRouter = Router();
profileRouter
  .post('/profile', profile.CreateFamerProfile);

export default profileRouter;
