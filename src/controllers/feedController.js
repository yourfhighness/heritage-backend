import { INTERNAL_SERVER_ERROR, SERVICE_UNAVAILABLE, OK } from 'http-status';
import responseHelper from '../Helpers/responseHelper';

class FeedController {
  static async feedCalucation(req, res) {
    try {
      if (req.body) {
        responseHelper.handleSuccess(SERVICE_UNAVAILABLE, 'Under Maintenance!! Please try again, after sometime.');
        return responseHelper.response(res);
      }

      const requiredKg = [11.6, 1.25, 5.51, 0.023, 0.016];
      const suppliedKg = [10.79, 1.04, 5.55, 0.036, 0.024];

      const nutrients = {
        message: 'Insufficient feed, please select more',
        dm: {
          required: requiredKg[0],
          supplied: suppliedKg[0],
        },
        cp: {
          required: requiredKg[1],
          supplied: suppliedKg[1],
        },
        tdn: {
          required: requiredKg[2],
          supplied: suppliedKg[2],
        },
        caAbsorbable: {
          required: requiredKg[3],
          supplied: suppliedKg[3],
        },
        pAbsorbable: {
          required: requiredKg[4],
          supplied: suppliedKg[4],
        },
      };

      const data = { feeds: req.body, nutrients };
      responseHelper.handleSuccess(OK, 'Feed proccessed successfully', data);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }
}

export default FeedController;
