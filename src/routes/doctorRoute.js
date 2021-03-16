import Router from 'express';
import busboyBodyParser from 'busboy-body-parser';
import doctor from '../controllers/doctorController';
import paginate from '../middlewares/paginateMiddleware';
import { verifyDoctorSession } from '../middlewares/verifyMiddlewares';
import { validateViewByStatus, validateUpdateAppointment, validateMedical } from '../middlewares/schemaMiddleware';

const busboyBodyParse = busboyBodyParser({ multi: true });
const doctorRouter = Router();
doctorRouter
  .get('/view-appointments-details/:id', verifyDoctorSession, doctor.viewAppointmentDetails)
  .get('/view-all-appointments', verifyDoctorSession, doctor.viewAppointment, paginate.paginateData)
  .post('/save-medical/:appointmentId', verifyDoctorSession, busboyBodyParse, validateMedical, doctor.saveMedical)
  .post('/update-appointment-status/:id', verifyDoctorSession, validateUpdateAppointment, doctor.updateAppointment)
  .post('/view-appointments-by-status', verifyDoctorSession, validateViewByStatus, doctor.viewAppointmentByStatus, paginate.paginateData);

export default doctorRouter;
