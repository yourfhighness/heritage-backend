import { INTERNAL_SERVER_ERROR, SERVICE_UNAVAILABLE, CREATED, OK } from 'http-status';
import responseHelper from '../Helpers/responseHelper';
import farmerHelper from '../Helpers/farmerHelper';

class FarmerController {
  static async createFamer(req, res) {
    try {
      responseHelper.handleSuccess(CREATED, 'Farmer profile created successfull');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewFamer(req, res) {
    try {
      const data = req.farmer;
      responseHelper.handleSuccess(OK, 'Farmer profile viewed successfull', data);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async updateFamer(req, res) {
    try {
      const data = await farmerHelper.updateFarmerProfile(req.farmer.id, req.body);
      if (data) {
        responseHelper.handleSuccess(OK, 'Farmer profile updated successfull', data);
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
