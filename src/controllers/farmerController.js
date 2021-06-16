import dotenv from 'dotenv';
import { INTERNAL_SERVER_ERROR, SERVICE_UNAVAILABLE, BAD_REQUEST, OK } from 'http-status';
import imageService from '../services/cloudinaryHelper';
import responseHelper from '../Helpers/responseHelper';
import farmerHelper from '../Helpers/farmerHelper';

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
}

export default FarmerController;
