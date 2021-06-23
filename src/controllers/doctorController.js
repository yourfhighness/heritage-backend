/* eslint-disable consistent-return */

import AWS from 'aws-sdk';
import Busboy from 'busboy';
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED, SERVICE_UNAVAILABLE, NOT_FOUND, BAD_REQUEST, OK } from 'http-status';

import farmerHelper from '../Helpers/farmerHelper';
import cattleHelper from '../Helpers/cattleHelper';
import doctorHelper from '../Helpers/doctorHelper';
import sessionHelper from '../Helpers/sessionHelper';
import responseHelper from '../Helpers/responseHelper';
import paginateHelper from '../Helpers/paginateHelper';
import passwordHelper from '../Helpers/passwordHelper';
import notificationHelper from '../Helpers/notificationHelper';

const s3bucket = new AWS.S3({
  Bucket: 'rivopets',
  accessKeyId: 'AKIAVPPMXB5IOX5XGBXV',
  secretAccessKey: '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',
});

const uploadToS3 = (file, appointmentExist, body, appointmentId, res) => {
  try {
    s3bucket.createBucket(() => {
      const params = {
        Bucket: 'rivopets',
        Key: `${new Date().toGMTString()}-${file.name}`,
        Body: file.data,
      };

      s3bucket.upload(params, async (err, result) => {
        if (err) {
          responseHelper.handleSuccess(BAD_REQUEST, err);
          return responseHelper.response(res);
        }

        const data = await doctorHelper.saveMedical(appointmentExist, body, appointmentId, result.Location);
        responseHelper.handleSuccess(OK, 'Medical saved successfully', data);
        return responseHelper.response(res);
      });
    });

    return;
  } catch (error) {
    responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseHelper.response(res);
  }
};
class DoctorController {
  static async doctorLogin(req, res) {
    try {
      const passwordExist = await passwordHelper.checkPassword(req.body.password, req.doctor.password);
      if (!passwordExist) {
        responseHelper.handleError(UNAUTHORIZED, 'Email or password incorrect');
        return responseHelper.response(res);
      }

      if (passwordExist) {
        const data = {
          session: await sessionHelper.generateDoctorSession(req.doctor.id, req.doctor.doctorName, req.doctor.email, req.doctor.phone, req.doctor.status),
          doctor: req.doctor,
        };

        responseHelper.handleSuccess(OK, 'Doctor logged in successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async updateDoctor(req, res) {
    try {
      let data = await doctorHelper.doctorExist('email', req.doctor.email);
      if (!data) {
        responseHelper.handleError(NOT_FOUND, `Doctor with ${req.doctor.email} not found`);
        return responseHelper.response(res);
      }

      data = await doctorHelper.updateDoctor(req.body, data, req.doctor.email);
      if (data) {
        responseHelper.handleSuccess(OK, 'Doctor updated successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewAppointmentDetails(req, res) {
    try {
      const data = await doctorHelper.appointmentExist('id', req.params.id);
      if (!data) {
        responseHelper.handleError(NOT_FOUND, `Appointment not found at the moment`);
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

  static async searchFarmerAppointments(req, res) {
    try {
      let data = await doctorHelper.searchFarmer(req.body.phone, req.doctor.regionName);

      if (!data) {
        responseHelper.handleError(NOT_FOUND, `Farmer not found at the moment`);
        return responseHelper.response(res);
      }

      data = await doctorHelper.searchAppointment('farmerId', data.id, req.body.status);
      if (data.length < 1) {
        responseHelper.handleError(NOT_FOUND, `Appointment not found at the moment`);
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

  static async viewAppointment(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await paginateHelper.paginateData(req.query);
      const viewedAppointments = await doctorHelper.viewAppointment(skip, start, req.doctor.id);

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

  static async viewAppointmentByStatus(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await paginateHelper.paginateData(req.query);
      const viewedAppointments = await doctorHelper.viewAppointmentByStatus(skip, start, req.doctor.id, req.doctor.regionName, req.body.status);

      const allDatata = viewedAppointments.rows;
      const countAllData = viewedAppointments.count;

      if (viewedAppointments.rows.length === 0) {
        responseHelper.handleError(NOT_FOUND, `${req.body.status} appointments not found at the moment in ${req.admin.regionName}`);
        return responseHelper.response(res);
      }

      req.data = { allDatata, countAllData, start, end, pages, skip, paginate };
      return next();
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async updateAppointment(req, res) {
    try {
      let data = await doctorHelper.appointmentExist('id', req.params.id);
      if (!data) {
        responseHelper.handleError(NOT_FOUND, `Appointment with ${req.params.id} not found`);
        return responseHelper.response(res);
      }

      if (data.doctorId !== req.doctor.id && req.doctor.regionName !== 'HYDERABAD') {
        responseHelper.handleError(NOT_FOUND, `Appointment with ${req.params.id} does not belong to you`);
        return responseHelper.response(res);
      }

      data = await doctorHelper.updateAppointmentStatus(req.params.id, req.body.status);

      if (data) {
        data = await doctorHelper.appointmentExist('id', req.params.id);
        const farmer = await farmerHelper.farmerExist('id', data.farmerId);
        const cattle = await cattleHelper.cattleExist('id', data.cattleId);

        if (farmer && farmer.firebaseToken) {
          if (req.body.status === 'finished') {
            await notificationHelper.sendNotification(farmer.firebaseToken, data.farmerId, req.doctor.id, `${cattle ? cattle.cattleName.charAt(0).toUpperCase() + cattle.cattleName.slice(1) : null} Appointment Finished`, `heritagevetplus://appointment/${data.id}`);
          }

          if (req.body.status === 'rejected') {
            await notificationHelper.sendNotification(farmer.firebaseToken, data.farmerId, req.doctor.id, `${cattle ? cattle.cattleName.charAt(0).toUpperCase() + cattle.cattleName.slice(1) : null} Appointment Rejected`, `heritagevetplus://appointments`);
          }
        }

        responseHelper.handleSuccess(OK, 'Appointment update successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async saveMedical(req, res) {
    const appointmentExist = await doctorHelper.appointmentExist('id', req.params.appointmentId);
    if (!appointmentExist) {
      responseHelper.handleError(NOT_FOUND, `Appointment with id ${req.params.appointmentId} not found at the moment`);
      return responseHelper.response(res);
    }

    if (appointmentExist.doctorId !== req.doctor.id && req.doctor.regionName !== 'HYDERABAD') {
      responseHelper.handleError(NOT_FOUND, `Appointment with ${req.params.appointmentId} does not belong to you`);
      return responseHelper.response(res);
    }

    if (req.files && Object.keys(req.files).length === 0 && req.files.constructor === Object) {
      const data = await doctorHelper.saveMedical(appointmentExist, req.body, req.params.appointmentId, null);
      responseHelper.handleSuccess(OK, 'Medical saved successfully', data);
      return responseHelper.response(res);
    }

    if (req.files) {
      if (req.files.document) {
        const busboy = new Busboy({ headers: req.headers });
        busboy.on('finish', () => { req.files.document.map((element) => uploadToS3(element, appointmentExist, req.body, req.params.appointmentId, res)); });
        req.pipe(busboy);
      }
    }
  }
}

export default DoctorController;
