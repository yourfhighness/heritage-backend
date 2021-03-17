/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import { v2 } from 'cloudinary';
import { SERVICE_UNAVAILABLE, INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST, OK } from 'http-status';

import appointmentHelper from '../Helpers/appointmentHelper';
import imageService from '../services/cloudinaryHelper';
import responseHelper from '../Helpers/responseHelper';
import paginateHelper from '../Helpers/paginateHelper';
import cattleHelper from '../Helpers/cattleHelper';

dotenv.config();

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class Appointment {
  static async saveAppointment(req, res) {
    try {
      if (!req.files.photos) {
        responseHelper.handleError(BAD_REQUEST, 'Please photos is required.');
        return responseHelper.response(res);
      }

      const cattleExist = await cattleHelper.cattleExist('id', req.params.cattleId);
      if (!cattleExist) {
        responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not found`);
        return responseHelper.response(res);
      }

      let document;
      const PrescriptionId = null;
      const { photos } = req.files;
      if (photos) {
        if (Object.prototype.toString.call(photos) === '[object Array]') {
          const resPromises = req.files.photos.map((file) => new Promise((resolve, reject) => {
            v2.uploader.upload(file.path, { use_filename: true, unique_filename: false }, (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            });
          }));

          Promise.all(resPromises)
            .then(async (result) => {
              const data = await appointmentHelper.saveAppointment(req.params.cattleId, req.farmer.id, req.farmer.regionName, PrescriptionId, result, req.body);
              responseHelper.handleSuccess(OK, 'Appointment saved successfully', data);
              return responseHelper.response(res);
            })
            .catch((error) => {
              responseHelper.handleError(BAD_REQUEST, `${error} [ Please check good internet and use correct type of files (jpg, png or pdf) ]`);
              return responseHelper.response(res);
            });
        }

        if (Object.prototype.toString.call(photos) !== '[object Array]') {
          document = await imageService(photos);

          if (document === 'Error' || document === undefined) {
            responseHelper.handleError(BAD_REQUEST, 'Please check good internet and use correct type of files(jpg, png or pdf).');
            return responseHelper.response(res);
          }

          const data = await appointmentHelper.saveAppointment(req.params.cattleId, req.farmer.id, req.farmer.regionName, PrescriptionId, [document], req.body);
          if (data) {
            responseHelper.handleSuccess(OK, 'Appointment saved successfully', data);
            return responseHelper.response(res);
          }
        }
      } else {
        responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
        return responseHelper.response(res);
      }
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewAppointment(req, res) {
    try {
      const data = await appointmentHelper.viewAppointment(req.params.appointmentId, req.farmer.id);
      if (!data) {
        responseHelper.handleError(NOT_FOUND, `Appointment with id ${req.params.appointmentId} not found`);
        return responseHelper.response(res);
      }

      if (data) {
        responseHelper.handleSuccess(OK, 'Appointment viewed successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async deleteAppointment(req, res) {
    try {
      const data = await appointmentHelper.viewAppointment(req.params.appointmentId, req.farmer.id);
      if (!data) {
        responseHelper.handleError(NOT_FOUND, `Appointment with id ${req.params.appointmentId} not found`);
        return responseHelper.response(res);
      }

      if (data) {
        await appointmentHelper.deleteAppointment(req.params.appointmentId);
        responseHelper.handleSuccess(OK, 'Appointment deleted successfully');
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewUpcomingAppointment(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await paginateHelper.paginateData(req.query);
      const viewedAppointments = await appointmentHelper.viewUpcomingAppointment(req.farmer.id, skip, start);

      const allDatata = viewedAppointments.rows;
      const countAllData = viewedAppointments.count;

      if (viewedAppointments.rows.length === 0) {
        responseHelper.handleError(NOT_FOUND, `Upcoming Appointments not found at the moment`);
        return responseHelper.response(res);
      }

      req.data = { allDatata, countAllData, start, end, pages, skip, paginate };
      return next();
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewPastAppointment(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await paginateHelper.paginateData(req.query);
      const viewedAppointments = await appointmentHelper.viewPastAppointment(req.farmer.id, skip, start);

      const allDatata = viewedAppointments.rows;
      const countAllData = viewedAppointments.count;

      if (viewedAppointments.rows.length === 0) {
        responseHelper.handleError(NOT_FOUND, `Past Appointments not found at the moment`);
        return responseHelper.response(res);
      }

      req.data = { allDatata, countAllData, start, end, pages, skip, paginate };
      return next();
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }
}

export default Appointment;
