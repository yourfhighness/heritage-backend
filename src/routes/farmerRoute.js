import Router from 'express';
import multiparty from 'connect-multiparty';
import famer from '../controllers/farmerController';
import { verifySesion } from '../middlewares/verifyMiddlewares';
import { validateUpdateFarmer } from '../middlewares/schemaMiddleware';

const multipart = multiparty();
const famerRouter = Router();
famerRouter
  .get('/view-farmer', verifySesion, famer.viewFamer)
  .patch('/upate-farmer', verifySesion, multipart, validateUpdateFarmer, famer.updateFamer);

export default famerRouter;
