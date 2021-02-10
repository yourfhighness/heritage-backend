import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import responseHelper from '../Helpers/responseHelper';

class PaginateData {
  static paginateData(req, res) {
    try {
      let name;
      if (req.master) {
        name = req.doctor.name;
      }
      if (req.farmer) {
        name = req.farmer.farmerName;
      }

      req.data.paginate.paginate = req.data.allDatata;
      if (req.data.start > 0) {
        req.data.paginate.Previous = {
          page: req.data.pages - 1,
          limit: req.data.skip,
        };
      } if (req.data.end < req.data.countAllData) {
        req.data.paginate.Next = {
          page: req.data.pages + 1,
          limit: req.data.skip,
        };
      }

      const data = req.data.paginate;
      responseHelper.handleSuccess(OK, `${name || 'Anonyms'} Those are data from this page ${req.data.pages}`, data);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }
}
export default PaginateData;
