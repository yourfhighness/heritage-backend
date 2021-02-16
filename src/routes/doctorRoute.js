import Router from 'express';
import multiparty from 'connect-multiparty';
import doctor from '../controllers/doctorController';
import paginate from '../middlewares/paginateMiddleware';
import { verifyDoctorSession } from '../middlewares/verifyMiddlewares';
import { validateViewByStatus, validateUpdateAppointment, validateMedical } from '../middlewares/schemaMiddleware';

const multipart = multiparty();
const doctorRouter = Router();
doctorRouter
  .get('/view-appointments-details/:id', verifyDoctorSession, doctor.viewAppointmentDetails)
  .get('/view-all-appointments', verifyDoctorSession, doctor.viewAppointment, paginate.paginateData)
  .post('/save-medical/:appointmentId', verifyDoctorSession, multipart, validateMedical, doctor.saveMedical)
  .post('/update-appointment-status/:id', verifyDoctorSession, validateUpdateAppointment, doctor.updateAppointment)
  .post('/view-appointments-by-status', verifyDoctorSession, validateViewByStatus, doctor.viewAppointmentByStatus, paginate.paginateData);

export default doctorRouter;
