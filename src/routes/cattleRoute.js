import Router from 'express';
import multiparty from 'connect-multiparty';
import cattle from '../controllers/cattleController';
import paginate from '../middlewares/paginateMiddleware';
import { verifySesion } from '../middlewares/verifyMiddlewares';
import {
  validateSlip,
  validateViewData,
  validateFilterSlip,
  validateUpdateSlip,
  validateUpdateCattle,
  validateRegisterCattle,
  validatePeriodicallySlip,
  validateViewUnitNameMccName,
} from '../middlewares/schemaMiddleware';

const multipart = multiparty();
const cattleRouter = Router();
cattleRouter
  .get('/count-cattles', verifySesion, cattle.countCattles)
  .delete('/delete-cattle/:cattleId', verifySesion, cattle.deleteCattle)
  .delete('/delete-slip/:slipId', verifySesion, cattle.deleteCattleSlip)
  .post('/save-slip', verifySesion, validateSlip, cattle.saveFarmerSlip)
  .post('/save-slip/:cattleId', verifySesion, validateSlip, cattle.saveCattleSlip)

  .post('/view-data', validateViewData, cattle.viewData)
  .post('/select-data', validateViewUnitNameMccName, cattle.selectData, paginate.paginateData)

  .get('/view-all-cattle', verifySesion, cattle.viewAllCattles)
  .get('/view-cattle/:cattleId', verifySesion, cattle.viewCattle)
  .get('/view-daily-slips', verifySesion, cattle.viewDailyFamerSlips)
  .get('/view-daily-slips/:cattleId', verifySesion, cattle.viewDailyCattleSlips)
  .get('/view-weekly-slips/:cattleId', verifySesion, cattle.viewWeeklyCattleSlips)
  .get('/view-cattle-all-slips/:cattleId', verifySesion, cattle.viewCattleAllSlips)
  .get('/view-monthly-slips/:cattleId', verifySesion, cattle.viewMonthlyCattleSlips)
  .get('/view-annualy-slips/:cattleId', verifySesion, cattle.viewAnnualyCattleSlips)
  .post('/filter-farmer-slips', verifySesion, validateFilterSlip, cattle.filterFarmerSlips)
  .post('/filter-cattle-slips/:cattleId', verifySesion, validateFilterSlip, cattle.filterCattleSlips)
  .post('/view-periodcally-farmer-slips', verifySesion, validatePeriodicallySlip, cattle.viewPeriodicallyFarmerSlips)
  .post('/view-periodcally-cattle-slips/:cattleId', verifySesion, validatePeriodicallySlip, cattle.viewPeriodicallyCattleSlips)

  .patch('/update-daily-slips/:slipId', verifySesion, validateUpdateSlip, cattle.updateCattleSlip)
  .post('/register-cattle', verifySesion, multipart, validateRegisterCattle, cattle.registerCattle)
  .patch('/upate-cattle/:cattleId', verifySesion, multipart, validateUpdateCattle, cattle.updateCattle);

export default cattleRouter;
