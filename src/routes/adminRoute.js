import Router from 'express';
import admin from '../controllers/adminController';
import paginate from '../middlewares/paginateMiddleware';
import { verifyAdminSession } from '../middlewares/verifyMiddlewares';
import { validateViewByStatus, validateUpdateAppointment } from '../middlewares/schemaMiddleware';

const adminRouter = Router();
adminRouter
  .get('/view-farmer-details/:id', verifyAdminSession, admin.viewFarmerDetails)
  .get('/view-all-doctors', verifyAdminSession, admin.viewAllDoctors, paginate.paginateData)
  .get('/view-all-farmers', verifyAdminSession, admin.viewAllFarmers, paginate.paginateData)
  .post('/update-farmer-status/:id', verifyAdminSession, validateUpdateAppointment, admin.updateFarmer)
  .post('/view-farmers-by-status', verifyAdminSession, validateViewByStatus, admin.viewFarmersByStatus, paginate.paginateData)
  .post('/view-doctors-by-status', verifyAdminSession, validateViewByStatus, admin.viewDoctorsByStatus, paginate.paginateData);

export default adminRouter;
