import Router from 'express';
import multiparty from 'connect-multiparty';
import paginate from '../middlewares/paginateMiddleware';
import appointment from '../controllers/appointmentController';
import { verifySesion } from '../middlewares/verifyMiddlewares';
import { validateAppointment } from '../middlewares/schemaMiddleware';

const multipart = multiparty();
const authRouter = Router();
authRouter
  .delete('/delete-appointment/:appointmentId', verifySesion, appointment.deleteAppointment)
  .get('/farmer-view-appointment/:appointmentId', verifySesion, appointment.viewAppointment)
  .get('/farmer-view-past-appointments', verifySesion, appointment.viewPastAppointment, paginate.paginateData)
  .get('/farmer-view-upcoming-appointments', verifySesion, appointment.viewUpcomingAppointment, paginate.paginateData)
  .post('/farmer-save-appointment/:cattleId', multipart, validateAppointment, verifySesion, appointment.saveAppointment);

export default authRouter;
