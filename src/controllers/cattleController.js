import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import helper from '../Helpers/responseHelper';
import cattle from '../Helpers/cattleHelper';

class CattleController {
  static async countCattles(req, res) {
    try {
      const data = {
        milking: await cattle.countMilking(),
        heifer: await cattle.countHeifer(),
        dry: await cattle.countDry(),
        calf: await cattle.countCalf(),
      };

      helper.handleSuccess(OK, 'Cattle counted successfull', data);
      return helper.response(res);
    } catch (error) {
      helper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return helper.response(res);
    }
  }
}

export default CattleController;
