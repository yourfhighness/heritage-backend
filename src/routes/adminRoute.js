import Router from 'express';
import multiparty from 'connect-multiparty';
import admin from '../controllers/adminController';
import paginate from '../middlewares/paginateMiddleware';
import { verifyAdminSession } from '../middlewares/verifyMiddlewares';
import { validateSaveData, validatePhone, validateUpdateFarmer, validateUpdateCattle, validateRemoveAllFarmers, validateSearchAppointment, validateProcced, validateViewByStatus, validateAssignRole, validateUpdateAppointment, validateViewUnitNameMccName } from '../middlewares/schemaMiddleware';

const multipart = multiparty();
const adminRouter = Router();

adminRouter
  .get('/view-trls', admin.viewTrlsAPI)
  .get('/view-product/:productId', admin.viewProductAPI)
  .put('/add-edit-product/:productId', multipart, admin.addEditProductAPI)

  .get('/count-data', verifyAdminSession, admin.countData)
  .post('/save-data', verifyAdminSession, validateSaveData, admin.saveData)
  .get('/view-farmer-details/:id', verifyAdminSession, admin.viewFarmerDetails)
  .post('/save-semi-verified-farmer', verifyAdminSession, admin.saveSemiVerifiedFarmer)

  .get('/view-all-farmers', verifyAdminSession, admin.viewAllFarmers, paginate.paginateData)
  .get('/view-all-doctors', verifyAdminSession, admin.viewAllDoctors, paginate.paginateData)
  .get('/view-all-employees', verifyAdminSession, admin.viewAllEmployees, paginate.paginateData)
  .get('/view-all-representative', verifyAdminSession, validateViewUnitNameMccName, admin.viewAllMccRepresentative, paginate.paginateData)

  .post('/view-farmers-by-status', verifyAdminSession, validateViewByStatus, admin.viewFarmersByStatus, paginate.paginateData)
  .post('/view-doctors-by-status', verifyAdminSession, validateViewByStatus, admin.viewDoctorsByStatus, paginate.paginateData)
  .post('/view-appointments-by-status', verifyAdminSession, validateViewByStatus, admin.viewAppointmentByStatus, paginate.paginateData)

  .post('/kill-farmer', verifyAdminSession, validatePhone, admin.killFarmer)
  .post('/search-farmer-request', verifyAdminSession, validateSearchAppointment, admin.searchFarmerRequest)
  .post('/remove-all-farmers-by-fields', verifyAdminSession, validateRemoveAllFarmers, admin.removeAllFrmers)

  .post('/procceed-data', verifyAdminSession, validateProcced, admin.adminUpdateFarmer)
  .post('/update-farmer-status/:id', verifyAdminSession, validateUpdateAppointment, admin.updateFarmer)
  .patch('/assign-rep-to-employee/:id', verifyAdminSession, validateAssignRole, admin.assignRepToEmployee)
  .patch('/upate-farmer/:farmerId', verifyAdminSession, multipart, validateUpdateFarmer, admin.updateFarmerDetails)
  .patch('/upate-cattle/:farmerId/:cattleId', verifyAdminSession, multipart, validateUpdateCattle, admin.updateCattle)

  .post('/report-cattles', verifyAdminSession, admin.reportCattlesByRegionName)
  .post('/report-farmers', verifyAdminSession, admin.reportFarmersByRegionName)
  .post('/report-feedbacks', verifyAdminSession, admin.reportFeedbacksByRegionName)
  .post('/report-consultations-details', verifyAdminSession, admin.reportConsultationsDetails)
  .post('/export-farmers', verifyAdminSession, validateViewByStatus, admin.exportFarmersByRegionName);

export default adminRouter;
