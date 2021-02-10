import Router from 'express';
import cattle from '../controllers/cattleController';
import { verifySesion } from '../middlewares/verifyMiddlewares';
import {
  validateSlip,
  validateFilterSlip,
  validateUpdateSlip,
  validateUpdateCattle,
  validateRegisterCattle,
  validatePeriodicallySlip,
} from '../middlewares/schemaMiddleware';

const cattleRouter = Router();
cattleRouter
  .get('/count-cattles', cattle.countCattles)
  .post('/save-slip/:cattleId', verifySesion, validateSlip, cattle.saveCattleSlip)

  .get('/view-cattle/:cattleId', verifySesion, cattle.viewCattle)
  .get('/view-daily-slips/:cattleId', verifySesion, cattle.viewDailyCattleSlips)
  .get('/view-weekly-slips/:cattleId', verifySesion, cattle.viewWeeklyCattleSlips)
  .get('/view-cattle-all-slips/:cattleId', verifySesion, cattle.viewCattleAllSlips)
  .get('/view-monthly-slips/:cattleId', verifySesion, cattle.viewMonthlyCattleSlips)
  .get('/view-annualy-slips/:cattleId', verifySesion, cattle.viewAnnualyCattleSlips)
  .post('/filter-cattle-slips/:cattleId', validateFilterSlip, verifySesion, cattle.filterCattleSlips)
  .post('/view-periodcally-slips/:cattleId', validatePeriodicallySlip, verifySesion, cattle.viewPeriodicallyCattleSlips)

  .post('/register-cattle', verifySesion, validateRegisterCattle, cattle.registerCattle)
  .patch('/upate-cattle/:cattleId', verifySesion, validateUpdateCattle, cattle.updateCattle)
  .patch('/update-daily-slips/:slipId', verifySesion, validateUpdateSlip, cattle.updateCattleSlip);

export default cattleRouter;
