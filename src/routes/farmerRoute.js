import Router from 'express';
import famer from '../controllers/farmerController';

const famerRouter = Router();
famerRouter
  .post('/famer', famer.createFamer);

export default famerRouter;
