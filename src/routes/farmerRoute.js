import Router from 'express';
import famer from '../controllers/farmerController';
import { verifySesion } from '../middlewares/verifyMiddlewares';
import { validateUpdateFarmer } from '../middlewares/schemaMiddleware';

const famerRouter = Router();
famerRouter
  .post('/famer', famer.createFamer)
  .get('/view-farmer', verifySesion, famer.viewFamer)
  .patch('/upate-farmer', verifySesion, validateUpdateFarmer, famer.updateFamer);

export default famerRouter;
