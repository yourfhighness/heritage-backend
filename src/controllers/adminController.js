import { INTERNAL_SERVER_ERROR, UNAUTHORIZED, SERVICE_UNAVAILABLE, NOT_FOUND, OK } from 'http-status';

import adminHelper from '../Helpers/adminHelper';
import sessionHelper from '../Helpers/sessionHelper';
import responseHelper from '../Helpers/responseHelper';
import paginateHelper from '../Helpers/paginateHelper';
import passwordHelper from '../Helpers/passwordHelper';

class AdminController {
  static async adminLogin(req, res) {
    try {
      const passwordExist = await passwordHelper.checkPassword(req.body.password, req.admin.password);
      if (!passwordExist) {
        responseHelper.handleError(UNAUTHORIZED, 'Email or password incorrect');
        return responseHelper.response(res);
      }

      if (passwordExist) {
        const data = {
          session: await sessionHelper.generateAdminSession(req.admin.id, req.admin.adminName, req.admin.email, req.admin.phone, req.admin.status),
          admin: req.admin,
        };

        responseHelper.handleSuccess(OK, 'Admin logged in successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewAllDoctors(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await paginateHelper.paginateData(req.query);
      const data = await adminHelper.viewAllDoctors(skip, start);
      const allDatata = data.rows;
      const countAllData = data.count;

      if (data.rows === undefined || data.rows.length === 0) {
        responseHelper.handleError(NOT_FOUND, 'Doctors not found at the moment');
        return responseHelper.response(res);
      }

      req.data = { allDatata, countAllData, start, end, pages, skip, paginate };
      return next();
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewAllFarmers(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await paginateHelper.paginateData(req.query);
      const data = await adminHelper.viewAllFarmers(skip, start);
      const allDatata = data.rows;
      const countAllData = data.count;

      if (data.rows === undefined || data.rows.length === 0) {
        responseHelper.handleError(NOT_FOUND, 'Farmers not found at the moment');
        return responseHelper.response(res);
      }

      req.data = { allDatata, countAllData, start, end, pages, skip, paginate };
      return next();
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewFarmersByStatus(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await paginateHelper.paginateData(req.query);
      const viewedData = await adminHelper.viewFarmersByStatus(skip, start, req.body.status);

      const allDatata = viewedData.rows;
      const countAllData = viewedData.count;

      if (viewedData.rows.length === 0) {
        responseHelper.handleError(NOT_FOUND, `${req.body.status} farmers not found at the momment`);
        return responseHelper.response(res);
      }

      req.data = { allDatata, countAllData, start, end, pages, skip, paginate };
      return next();
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewDoctorsByStatus(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await paginateHelper.paginateData(req.query);
      const viewedData = await adminHelper.viewDoctorsByStatus(skip, start, req.body.status);

      const allDatata = viewedData.rows;
      const countAllData = viewedData.count;

      if (viewedData.rows.length === 0) {
        responseHelper.handleError(NOT_FOUND, `${req.body.status} doctors not found at the momment`);
        return responseHelper.response(res);
      }

      req.data = { allDatata, countAllData, start, end, pages, skip, paginate };
      return next();
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewFarmerDetails(req, res) {
    try {
      const data = await adminHelper.FarmerExist('id', req.params.id);
      if (!data) {
        responseHelper.handleError(NOT_FOUND, `Farmer with ${req.params.id} not found`);
        return responseHelper.response(res);
      }

      if (data) {
        responseHelper.handleSuccess(OK, 'Farmer viewed successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async updateFarmer(req, res) {
    try {
      let data = await adminHelper.FarmerExist('id', req.params.id);
      if (!data) {
        responseHelper.handleError(NOT_FOUND, `Farmer with ${req.params.id} not found`);
        return responseHelper.response(res);
      }

      data = await adminHelper.updateFarmerStatus(req.params.id, req.body.status);
      if (data) {
        data = await adminHelper.FarmerExist('id', req.params.id);
        responseHelper.handleSuccess(OK, 'Farmer update successfully', data);
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

export default AdminController;
