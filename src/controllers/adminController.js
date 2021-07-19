/* eslint-disable consistent-return */

import axios from 'axios';
import AWS from 'aws-sdk';

import { INTERNAL_SERVER_ERROR, UNAUTHORIZED, SERVICE_UNAVAILABLE, NOT_FOUND, BAD_REQUEST, CREATED, OK } from 'http-status';

import helper from '../Helpers/helpFunction';
import adminHelper from '../Helpers/adminHelper';
import farmerHelper from '../Helpers/farmerHelper';
import cattleHelper from '../Helpers/cattleHelper';
import sessionHelper from '../Helpers/sessionHelper';
import responseHelper from '../Helpers/responseHelper';
import paginateHelper from '../Helpers/paginateHelper';
import passwordHelper from '../Helpers/passwordHelper';
import imageService from '../services/cloudinaryHelper';

const open = require('open');
const path = require("path");
const fileSystem = require('fs');
const fastcsv = require('fast-csv');

const s3bucket = new AWS.S3({
  Bucket: 'rivopets',
  accessKeyId: 'AKIAVPPMXB5IOX5XGBXV',
  secretAccessKey: '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',
});

const uploadToS3 = (file, name, adminName, res) => {
  try {
    s3bucket.createBucket(() => {
      const params = {
        Bucket: 'rivopets',
        Key: `${adminName}-${name}-${new Date().toGMTString()}.csv`,
        Body: file,
      };

      s3bucket.upload(params, async (err, result) => {
        if (err) {
          responseHelper.handleSuccess(BAD_REQUEST, err);
          return responseHelper.response(res);
        }

        open(result.Location);
        responseHelper.handleSuccess(OK, 'Excel File processed successfully', result.Location);
        return responseHelper.response(res);
      });
    });

    return;
  } catch (error) {
    responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseHelper.response(res);
  }
};
class AdminController {
  static async saveData(req, res) {
    try {
      if (req.body.unitName.length !== req.body.mccName.length) {
        responseHelper.handleError(BAD_REQUEST, 'Mcc Name should have corresponding Unit Name');
        return responseHelper.response(res);
      }

      const data = await cattleHelper.saveData(req.body);
      if (data) {
        responseHelper.handleSuccess(CREATED, 'Data saved successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async saveSemiVerifiedFarmer(req, res) {
    try {
      const data = await farmerHelper.saveSemiVerifiedFarmer(req.body);
      if (data) {
        responseHelper.handleSuccess(CREATED, 'Semi farmer saved successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async createRegion(req, res) {
    try {
      if (req.admin.regionName !== 'HYDERABAD' && req.admin.regionName !== req.body.regionName) {
        responseHelper.handleError(BAD_REQUEST, `Region name ${req.body.regionName} does not belong in your region`);
        return responseHelper.response(res);
      }

      let document;
      if (req.files.document) {
        document = await imageService(req.files.document);
        if (document === 'Error' || document === undefined) {
          responseHelper.handleError(BAD_REQUEST, 'Please check good internet and use correct type of files(jpg, png or pdf).');
          return responseHelper.response(res);
        }
      }

      const data = await adminHelper.createRegion(req.body, document);
      responseHelper.handleSuccess(OK, 'Region saved successfully', data);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

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

  static async countData(req, res) {
    try {
      const datas = {
        countedRepresentatives: await farmerHelper.countData('MCC Representative', req.admin.regionName),
        countedEmployees: await farmerHelper.countData('employee', req.admin.regionName),
        countedFarmers: await farmerHelper.countData('farmer', req.admin.regionName),
        countedCattles: await farmerHelper.countCattles(req.admin.regionName),
      };

      responseHelper.handleSuccess(OK, 'Representatives, Farmers, Cattles counted successfully', datas);
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

  static async viewAllEmployees(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await paginateHelper.paginateData(req.query);
      const data = await adminHelper.viewAllEmployees(skip, start);
      const allDatata = data.rows;
      const countAllData = data.count;

      if (data.rows === undefined || data.rows.length === 0) {
        responseHelper.handleError(NOT_FOUND, 'Employees not found at the moment');
        return responseHelper.response(res);
      }

      req.data = { allDatata, countAllData, start, end, pages, skip, paginate };
      return next();
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewAllMccRepresentative(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await paginateHelper.paginateData(req.query);
      const data = await adminHelper.viewAllMccRepresentative(req.body.attribute, req.body.value, req.admin.regionName, skip, start);
      const allDatata = data.rows;
      const countAllData = data.count;

      if (data.rows === undefined || data.rows.length === 0) {
        responseHelper.handleError(NOT_FOUND, 'Mcc representative not found at the moment');
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

      if (allDatata === undefined || allDatata.length === 0) {
        responseHelper.handleError(NOT_FOUND, 'Farmers not found at the moment');
        return responseHelper.response(res);
      }
      const dataContainer = [];

      for (let i = 0; i < allDatata.length; i += 1) { dataContainer.push(allDatata[i].dataValues); }
      const file = await fileSystem.createWriteStream('farmer.csv');
      await fastcsv.write(dataContainer, { headers: true }).pipe(file);

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
      const viewedAppointments = await adminHelper.viewAppointmentByStatus(skip, start, req.admin.regionName, req.body.status);

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

  static async viewAppointmentDetails(req, res) {
    try {
      const data = await adminHelper.appointmentExist('id', req.params.id);
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

  static async viewFarmersByStatus(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await paginateHelper.paginateData(req.query);
      const viewedData = await adminHelper.viewFarmersByStatus(skip, start, req.admin.regionName, req.body.status);

      const allDatata = viewedData.rows;
      const countAllData = viewedData.count;

      if (viewedData.rows.length === 0) {
        responseHelper.handleError(NOT_FOUND, `${req.body.status} farmers not found at the moment`);
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
        responseHelper.handleError(NOT_FOUND, `${req.body.status} doctors not found at the moment`);
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
      const data = await adminHelper.farmerExist('id', req.params.id);
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

  static async searchFarmerRequest(req, res) {
    try {
      const data = await farmerHelper.searchFarmer(req.body.phone, req.admin.regionName, req.body.status);

      if (!data) {
        responseHelper.handleError(NOT_FOUND, `Farmer not found at the moment`);
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

  static async updateFarmerDetails(req, res) {
    try {
      let document;
      if (req.files.profilePicture) {
        document = await imageService(req.files.profilePicture);
        if (document === 'Error' || document === undefined) {
          responseHelper.handleError(BAD_REQUEST, 'Please check good internet and use correct type of files(jpg, png or pdf).');
          return responseHelper.response(res);
        }
      }

      let data = await adminHelper.farmerExist('id', req.params.farmerId);
      if (!data) {
        responseHelper.handleError(NOT_FOUND, `Farmer with id ${req.params.farmerId} not found`);
        return responseHelper.response(res);
      }

      data = await adminHelper.updateFarmerDetails(req.body, document, data);
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

  static async updateFarmer(req, res) {
    try {
      let data = await adminHelper.farmerExist('id', req.params.id);
      if (!data) {
        responseHelper.handleError(NOT_FOUND, `Farmer with ${req.params.id} not found`);
        return responseHelper.response(res);
      }

      data = await adminHelper.updateFarmerField(req.admin.regionName, req.params.id, req.body.status, 'status');
      if (data[0] === 1) {
        data = await adminHelper.farmerExist('id', req.params.id);
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

  static async assignRepToEmployee(req, res) {
    try {
      const user = await adminHelper.farmerExist('id', req.params.id);
      if (!user) {
        responseHelper.handleError(NOT_FOUND, `Farmer with ${req.params.id} not found`);
        return responseHelper.response(res);
      }

      let data = await adminHelper.updateFarmerField(req.admin.regionName, req.params.id, req.body.assigned, 'assigned');
      if (data) {
        data = await adminHelper.farmerExist('id', req.params.id);
        responseHelper.handleSuccess(OK, `${req.body.assigned} assigned successfully to ${user.role} ${user.farmerName}`, data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async updateCattle(req, res) {
    try {
      const cattleExist = await cattleHelper.cattleExist('id', req.params.cattleId);
      if (!cattleExist || cattleExist.farmerId !== parseInt(req.params.farmerId, 10)) {
        responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not found`);
        return responseHelper.response(res);
      }

      if (cattleExist) {
        if (req.files.profilePicture) {
          const document = await imageService(req.files.profilePicture);
          if (document === 'Error' || document === undefined) {
            responseHelper.handleError(BAD_REQUEST, 'Please check good internet and use correct type of files(jpg, png or pdf).');
            return responseHelper.response(res);
          }

          const data = await cattleHelper.updateCattleProfile(req.params.cattleId, document, req.body);
          if (data) {
            responseHelper.handleSuccess(OK, 'Cattle profile updated successfully', data);
            return responseHelper.response(res);
          }
        }

        const data = await cattleHelper.updateCattleProfile(req.params.cattleId, cattleExist.profilePicture, req.body);
        if (data) {
          responseHelper.handleSuccess(OK, 'Cattle profile updated successfully', data);
          return responseHelper.response(res);
        }
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async adminUpdateFarmer(req, res) {
    try {
      await helper.adminUpdateFarmer(req.body.attribute, req.body.newValue, req.body.oldValue);

      responseHelper.handleSuccess(OK, 'Action Processed successfully');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async addEditProductAPI(req, res) {
    try {
      const { trl } = req.body;
      const categories = req.body.category;
      const businessModels = req.body.businessModel;
      const { data } = await axios.put(`https://api-test.innoloft.com/product/${req.params.productId}`, { trl, categories, businessModels });
      responseHelper.handleSuccess(OK, 'Product proccessed successfully', data);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewProductAPI(req, res) {
    try {
      const { data } = await axios.get(`https://api-test.innoloft.com/product/${req.params.productId}`);
      responseHelper.handleSuccess(OK, 'Product viewed successfully', data);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewTrlsAPI(req, res) {
    try {
      const { data } = await axios.get(`https://api-test.innoloft.com/trl`);
      responseHelper.handleSuccess(OK, 'Trls viewed successfully', data);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async killFarmer(req, res) {
    try {
      const farmer = await farmerHelper.farmerRegionExist(req.body.phone, req.admin.regionName);
      if (!farmer) {
        responseHelper.handleError(UNAUTHORIZED, `Farmer with this ${req.body.phone} not found at the moment`);
        return responseHelper.response(res);
      }

      await farmerHelper.resetFarmer(farmer.id);
      responseHelper.handleSuccess(OK, 'Farmer dead successfully', farmer);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async removeAllFrmers(req, res) {
    try {
      await farmerHelper.removeAllFrmers(req.body.field, req.body.value);
      responseHelper.handleSuccess(OK, 'Farmers removed successfully');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async exportFarmersByRegionName(req, res) {
    try {
      const viewedData = await adminHelper.adminExportFarmersByStatusAndRegionName(req.admin.regionName, req.body.status);

      if (viewedData.length === 0) {
        responseHelper.handleError(NOT_FOUND, `${req.body.status} farmers not found at the moment`);
        return responseHelper.response(res);
      }

      const dataContainer = [];
      for (let i = 0; i < viewedData.length; i += 1) { dataContainer.push(viewedData[i].dataValues); }
      const file = await fileSystem.createWriteStream(`${req.admin.adminName}-Farmers.csv`);
      await fastcsv.write(dataContainer, { headers: true })
        .on('finish', async () => {
          const generatedFile = await path.resolve(`./${req.admin.adminName}-Farmers.csv`);
          const fileStream = await fileSystem.createReadStream(generatedFile);

          await uploadToS3(fileStream, 'Farmers', req.admin.adminName, res);
        })
        .pipe(file);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async reportFarmersByRegionName(req, res) {
    try {
      const viewedData = await adminHelper.adminReportFarmersByStatusAndRegionName(req.admin.regionName);

      if (viewedData.length === 0) {
        responseHelper.handleError(NOT_FOUND, `${req.body.status} farmers not found at the moment`);
        return responseHelper.response(res);
      }

      const dataContainer = [];
      for (let i = 0; i < viewedData.length; i += 1) { dataContainer.push(viewedData[i].dataValues); }
      const file = await fileSystem.createWriteStream(`${req.admin.adminName}-Farmers.csv`);
      await fastcsv.write(dataContainer, { headers: true })
        .on('finish', async () => {
          const generatedFile = await path.resolve(`./${req.admin.adminName}-Farmers.csv`);
          const fileStream = await fileSystem.createReadStream(generatedFile);

          await uploadToS3(fileStream, 'Farmers', req.admin.adminName, res);
        })
        .pipe(file);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async reportCattlesByRegionName(req, res) {
    try {
      const data = await adminHelper.adminReportCattlesByRegionName(req.admin.regionName);
      const viewedData = data.map((farmer) => farmer.Cattle).flat();

      if (viewedData.length === 0) {
        responseHelper.handleError(NOT_FOUND, 'Cattles not found at the moment');
        return responseHelper.response(res);
      }

      const dataContainer = [];
      for (let i = 0; i < viewedData.length; i += 1) { dataContainer.push(viewedData[i].dataValues); }
      const file = await fileSystem.createWriteStream(`${req.admin.adminName}-Cattles.csv`);
      await fastcsv.write(dataContainer, { headers: true })
        .on('finish', async () => {
          const generatedFile = await path.resolve(`./${req.admin.adminName}-Cattles.csv`);
          const fileStream = await fileSystem.createReadStream(generatedFile);

          await uploadToS3(fileStream, 'Cattles', req.admin.adminName, res);
        })
        .pipe(file);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async reportFeedbacksByRegionName(req, res) {
    try {
      const data = await adminHelper.adminReportFeedbacksByRegionName(req.admin.regionName);
      const viewedData = data.map((farmer) => farmer.FarmerFeedback).flat();

      if (viewedData.length === 0) {
        responseHelper.handleError(NOT_FOUND, 'Farmer feedback not found at the moment');
        return responseHelper.response(res);
      }

      const dataContainer = [];
      for (let i = 0; i < viewedData.length; i += 1) { dataContainer.push(viewedData[i].dataValues); }
      const file = await fileSystem.createWriteStream(`${req.admin.adminName}-Feedbacks.csv`);
      await fastcsv.write(dataContainer, { headers: true })
        .on('finish', async () => {
          const generatedFile = await path.resolve(`./${req.admin.adminName}-Feedbacks.csv`);
          const fileStream = await fileSystem.createReadStream(generatedFile);

          await uploadToS3(fileStream, 'Feedbacks', req.admin.adminName, res);
        })
        .pipe(file);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async reportConsultationsDetails(req, res) {
    try {
      const data = await adminHelper.adminReportConsultationsDetailsByRegionName(req.admin.regionName);

      const viewedData = data.map((farmer) => farmer.Medical).flat();

      if (viewedData.length === 0) {
        responseHelper.handleError(NOT_FOUND, 'Farmer feedback not found at the moment');
        return responseHelper.response(res);
      }

      const dataContainer = [];
      for (let i = 0; i < viewedData.length; i += 1) { dataContainer.push(viewedData[i].dataValues); }
      const file = await fileSystem.createWriteStream(`${req.admin.adminName}-Feedbacks.csv`);
      await fastcsv.write(dataContainer, { headers: true })
        .on('finish', async () => {
          const generatedFile = await path.resolve(`./${req.admin.adminName}-Feedbacks.csv`);
          const fileStream = await fileSystem.createReadStream(generatedFile);

          await uploadToS3(fileStream, 'Feedbacks', req.admin.adminName, res);
        })
        .pipe(file);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }
}

export default AdminController;
