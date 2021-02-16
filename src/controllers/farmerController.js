import { INTERNAL_SERVER_ERROR, SERVICE_UNAVAILABLE, CREATED, BAD_REQUEST, OK } from 'http-status';
import imageService from '../services/cloudinaryHelper';
import responseHelper from '../Helpers/responseHelper';
import farmerHelper from '../Helpers/farmerHelper';

class FarmerController {
  static async createFamer(req, res) {
    try {
      responseHelper.handleSuccess(CREATED, 'Farmer profile created successfully');
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

      const data = await farmerHelper.updateFarmerProfile(req.farmer.id, document, req.body);
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
