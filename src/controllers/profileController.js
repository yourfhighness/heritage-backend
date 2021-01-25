import { INTERNAL_SERVER_ERROR, CREATED } from 'http-status';
import helper from '../Helpers/responseHelper';

class ProfileController {
  static async CreateFamerProfile(req, res) {
    try {
      helper.handleSuccess(CREATED, 'Farmer profile created successfull');
      return helper.response(res);
    } catch (error) {
      helper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return helper.response(res);
    }
  }
}

export default ProfileController;
