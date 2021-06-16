import Router from 'express';
import paginate from '../middlewares/paginateMiddleware';
import { verifySesion } from '../middlewares/verifyMiddlewares';
import notification from '../controllers/notificationController';
import { validateViewNotification } from '../middlewares/schemaMiddleware';

const notificationRouter = Router();
notificationRouter
  .patch('/update-notification/:notificationId', verifySesion, validateViewNotification, notification.updateNotification)
  .post('/view-notification', verifySesion, validateViewNotification, notification.viewNotifications, paginate.paginateData);

export default notificationRouter;
