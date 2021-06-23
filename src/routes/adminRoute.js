import Router from 'express';
import multiparty from 'connect-multiparty';
import admin from '../controllers/adminController';
import paginate from '../middlewares/paginateMiddleware';
import { verifyAdminSession } from '../middlewares/verifyMiddlewares';
import { validateSaveData, validatePhone, validateUpdateFarmer, validateUpdateCattle, validateRemoveAllFarmers, validateSearchAppointment, validateProcced, validateViewByStatus, validateUpdateAppointment, validateViewUnitNameMccName } from '../middlewares/schemaMiddleware';

const multipart = multiparty();
const adminRouter = Router();

adminRouter
  .get('/view-trls', admin.viewTrlsAPI)
  .get('/view-product/:productId', admin.viewProductAPI)
  .get('/count-data', verifyAdminSession, admin.countData)
  .put('/add-edit-product/:productId', multipart, admin.addEditProductAPI)
  .post('/save-data', verifyAdminSession, validateSaveData, admin.saveData)
  .get('/view-farmer-details/:id', verifyAdminSession, admin.viewFarmerDetails)
  .post('/save-semi-verified-farmer', verifyAdminSession, admin.saveSemiVerifiedFarmer)

  .get('/view-all-farmers', verifyAdminSession, admin.viewAllFarmers, paginate.paginateData)
  .get('/view-all-doctors', verifyAdminSession, admin.viewAllDoctors, paginate.paginateData)
  .get('/view-all-employees', verifyAdminSession, admin.viewAllEmployees, paginate.paginateData)
  .get('/view-all-representative', verifyAdminSession, validateViewUnitNameMccName, admin.viewAllMccRepresentative, paginate.paginateData)

  .post('/update-farmer-status/:id', verifyAdminSession, validateUpdateAppointment, admin.updateFarmer)
  .post('/view-farmers-by-status', verifyAdminSession, validateViewByStatus, admin.viewFarmersByStatus, paginate.paginateData)
  .post('/view-doctors-by-status', verifyAdminSession, validateViewByStatus, admin.viewDoctorsByStatus, paginate.paginateData)
  .post('/view-appointments-by-status', verifyAdminSession, validateViewByStatus, admin.viewAppointmentByStatus, paginate.paginateData)

  .post('/kill-farmer', verifyAdminSession, validatePhone, admin.killFarmer)
  .post('/procceed-data', verifyAdminSession, validateProcced, admin.adminUpdateFarmer)
  .post('/search-farmer-request', verifyAdminSession, validateSearchAppointment, admin.searchFarmerRequest)
  .post('/remove-all-farmers-by-fields', verifyAdminSession, validateRemoveAllFarmers, admin.removeAllFrmers)

  .post('/export-farmer', verifyAdminSession, validateViewByStatus, admin.exportFarmersByStatus)
  .patch('/upate-farmer/:farmerId', verifyAdminSession, multipart, validateUpdateFarmer, admin.updateFarmerDetails)
  .patch('/upate-cattle/:farmerId/:cattleId', verifyAdminSession, multipart, validateUpdateCattle, admin.updateCattle);

export default adminRouter;
