import dotenv from 'dotenv';
import { INTERNAL_SERVER_ERROR, SERVICE_UNAVAILABLE, BAD_REQUEST, OK } from 'http-status';
import imageService from '../services/cloudinaryHelper';
import responseHelper from '../Helpers/responseHelper';
import farmerHelper from '../Helpers/farmerHelper';

const fetch = require('node-fetch');

dotenv.config();
class FarmerController {
  static async saveFeedback(req, res) {
    try {
      if (req.body.feedback === process.env.EMPLOYEE) {
        const updatedFarmer = await farmerHelper.updateFarmer('role', 'employee', 'id', req.farmer.id);
        responseHelper.handleSuccess(OK, 'Farmer role updated to Employee role successfully', updatedFarmer);
        return responseHelper.response(res);
      }

      const feedback = await farmerHelper.saveFeedback(req.farmer.id, req.body.feedback);
      responseHelper.handleSuccess(OK, 'Feedback saved successfully', feedback);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewFamer(req, res) {
    try {
      const data = req.farmer;
      responseHelper.handleSuccess(OK, 'Farmer profile viewed successfully', data);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async updateFamer(req, res) {
    try {
      let document;
      if (req.files.profilePicture) {
        document = await imageService(req.files.profilePicture);
        if (document === 'Error' || document === undefined) {
          responseHelper.handleError(BAD_REQUEST, 'Please check good internet and use correct type of files(jpg, png or pdf).');
          return responseHelper.response(res);
        }
      }

      const data = await farmerHelper.updateFarmerProfile(req.farmer.id, document, req.body, req.farmer.password);
      if (data) {
        responseHelper.handleSuccess(OK, 'Farmer profile updated successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  // eslint-disable-next-line consistent-return
  static async triggerNotification(req, res) {
    try {
      const fcmTokens = ['dHI0fpnrQpyG791gOjv7x0:APA91bEwWjaH_2wV3G43QLkWt-6cfVsti3lzhtGxlaHdroRbtfVedSuylE6NaY2YxPZeOAIJFmk2GpHZoRwWxPLCyjdR2Y5uqWpJPY7BKWN6kcPckcv5qPbhnucaxQRCk955GmoEHgvE'];
      const notification = { title: 'Heritage', body: ' Please, submit evenning milk' };
      const notificationBody = { notification, registration_ids: fcmTokens };

      fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        body: JSON.stringify(notificationBody),
        headers: { Authorization: 'key=AAAAA54Y4zo:APA91bEJb_HIRoLB46xLPeyeGGOOx8k-k8-GHtk77VgXI2c26QNqIhoCuCu4XN6crjiy4eyxjpMM95bksI_PMFkiETD94SL3lJgUj-qky2jn-O4Xo42vakJ0bA50p6qg8SvuNssA3gqq', 'Content-Type': 'application/json' },
      })
        .then((result) => {
          responseHelper.handleSuccess(OK, 'Notification triggered successfully', result);
          return responseHelper.response(res);
        })
        .catch((err) => {
          responseHelper.handleError(SERVICE_UNAVAILABLE, JSON.stringify(err));
          return responseHelper.response(res);
        });
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }
}

export default FarmerController;
