import dotenv from 'dotenv';
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from 'http-status';

import responseHelper from '../Helpers/responseHelper';
import paginateHelper from '../Helpers/paginateHelper';
import notificationHelper from '../Helpers/notificationHelper';

dotenv.config();
class NotificationController {
  static async viewNotifications(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await paginateHelper.paginateData(req.query);
      const data = await notificationHelper.viewNotifications(req.farmer.id, req.body.isRead, skip, start);

      const allDatata = data.rows;
      const countAllData = data.count;

      if (data.rows.length === 0) {
        responseHelper.handleError(NOT_FOUND, `Notification not found at the moment`);
        return responseHelper.response(res);
      }

      req.data = { allDatata, countAllData, start, end, pages, skip, paginate };
      return next();
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async updateNotification(req, res) {
    try {
      await notificationHelper.updateNotification(req.body.isRead, req.params.notificationId);
      responseHelper.handleSuccess(OK, 'Notification updated successfully');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }
}

export default NotificationController;
