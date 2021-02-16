import { SERVICE_UNAVAILABLE, INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST, CONFLICT, CREATED, OK } from 'http-status';
import imageService from '../services/cloudinaryHelper';
import responseHelper from '../Helpers/responseHelper';
import cattleHelper from '../Helpers/cattleHelper';

class CattleController {
  static async registerCattle(req, res) {
    try {
      if (req.body.cattleUID) {
        const cattleExist = await cattleHelper.cattleExist('cattleUID', req.body.cattleUID);
        if (cattleExist) {
          responseHelper.handleError(CONFLICT, `Cattle with ${req.body.cattleUID} already exist`);
          return responseHelper.response(res);
        }
      }

      if (!req.files.profilePicture) {
        responseHelper.handleError(BAD_REQUEST, 'Please cattle profile picture is required.');
        return responseHelper.response(res);
      }

      const document = await imageService(req.files.profilePicture);
      if (document === 'Error' || document === undefined) {
        responseHelper.handleError(BAD_REQUEST, 'Please check good internet and use correct type of files(jpg, png or pdf).');
        return responseHelper.response(res);
      }

      const data = await cattleHelper.saveCattle(req.body, document, req.farmer.id);
      if (data) {
        responseHelper.handleSuccess(CREATED, 'Cattle registered successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async countCattles(req, res) {
    try {
      const data = {
        milking: await cattleHelper.countMilking('farmerId', req.farmer.id),
        heifer: await cattleHelper.countHeifer('farmerId', req.farmer.id),
        dry: await cattleHelper.countDry('farmerId', req.farmer.id),
        calf: await cattleHelper.countCalf('farmerId', req.farmer.id),
      };

      responseHelper.handleSuccess(OK, 'Cattle counted successfully', data);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewAllCattles(req, res) {
    try {
      const data = await cattleHelper.viewAllCattle('farmerId', req.farmer.id);

      if (data.length < 1) {
        responseHelper.handleError(NOT_FOUND, `Cattles not found`);
        return responseHelper.response(res);
      }

      if (data) {
        responseHelper.handleSuccess(OK, 'Cattles viewed successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewCattle(req, res) {
    try {
      const data = await cattleHelper.cattleExist('id', req.params.cattleId);

      if (!data) {
        responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not found`);
        return responseHelper.response(res);
      }

      if (data) {
        responseHelper.handleSuccess(OK, 'Cattle profile viewed successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async deleteCattle(req, res) {
    try {
      const data = await cattleHelper.cattleDeleteExist(req.params.cattleId, req.farmer.id);

      if (!data) {
        responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not found`);
        return responseHelper.response(res);
      }

      if (data) {
        await cattleHelper.deleteCattle(req.params.cattleId);
        responseHelper.handleSuccess(OK, 'Cattle profile deleted successfully');
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
      if (!cattleExist || cattleExist.farmerId !== req.farmer.id) {
        responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not found`);
        return responseHelper.response(res);
      }

      if (req.body.cattleUID) {
        const cattleUID = await cattleHelper.cattleExist('cattleUID', req.body.cattleUID);
        if (cattleUID && cattleExist.farmerId !== req.farmer.id) {
          responseHelper.handleError(CONFLICT, `Cattle with ${req.body.cattleUID} already exist`);
          return responseHelper.response(res);
        }
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

  static async saveCattleSlip(req, res) {
    try {
      const cattleExist = await cattleHelper.cattleExist('id', req.params.cattleId);

      if (!cattleExist) {
        responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not found`);
        return responseHelper.response(res);
      }

      if (cattleExist) {
        if (cattleExist.farmerId !== req.farmer.id) {
          responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not belong to you`);
          return responseHelper.response(res);
        }

        if (cattleExist.category !== 'milking') {
          responseHelper.handleError(NOT_FOUND, `Cattle is not milking`);
          return responseHelper.response(res);
        }

        const Cattle = await cattleHelper.viewDailyCattleSlips('cattleId', req.params.cattleId);
        const slips = Cattle.find((slip) => slip.shift === req.body.shift);
        if (slips) {
          responseHelper.handleError(CONFLICT, `Cattle's ${req.body.shift} shift slip already saved`);
          return responseHelper.response(res);
        }

        const data = await cattleHelper.saveCattleSlip(req.body, req.params.cattleId);
        if (data) {
          responseHelper.handleSuccess(CREATED, 'Slip saved successfully', data);
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

  static async saveFarmerSlip(req, res) {
    try {
      const cattleExist = await cattleHelper.cattleExist('farmerId', req.farmer.id);

      if (!cattleExist) {
        responseHelper.handleError(NOT_FOUND, `Cattles not found`);
        return responseHelper.response(res);
      }

      if (cattleExist) {
        if (cattleExist.farmerId !== req.farmer.id) {
          responseHelper.handleError(NOT_FOUND, `Cattle not belong to you`);
          return responseHelper.response(res);
        }

        const Cattle = await cattleHelper.viewDailyCattleSlips('farmerId', req.farmer.id);
        const slips = Cattle.find((slip) => slip.shift === req.body.shift);
        if (slips) {
          responseHelper.handleError(CONFLICT, `Cattle's ${req.body.shift} shift slip already saved`);
          return responseHelper.response(res);
        }

        const data = await cattleHelper.saveCattleSlip(req.body, req.farmer.id);
        if (data) {
          responseHelper.handleSuccess(CREATED, 'Slip saved successfully', data);
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

  static async updateCattleSlip(req, res) {
    try {
      const slipExist = await cattleHelper.slipExist('id', req.params.slipId);
      if (!slipExist) {
        responseHelper.handleError(NOT_FOUND, `Milk slip with id ${req.params.slipId} not found`);
        return responseHelper.response(res);
      }

      if (slipExist) {
        const data = await cattleHelper.updateCattleSlip(req.params.slipId, req.body);
        if (data) {
          responseHelper.handleSuccess(OK, 'Milk slip updated successfully', data);
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

  static async deleteCattleSlip(req, res) {
    try {
      const slipExist = await cattleHelper.slipExist('id', req.params.slipId);
      if (!slipExist) {
        responseHelper.handleError(NOT_FOUND, `Milk slip with id ${req.params.slipId} not found`);
        return responseHelper.response(res);
      }

      if (slipExist) {
        await cattleHelper.deleteCattleSlip(req.params.slipId);
        responseHelper.handleSuccess(OK, 'Milk slip deleted successfully');
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewDailyCattleSlips(req, res) {
    try {
      const cattleExist = await cattleHelper.cattleExist('id', req.params.cattleId);

      if (!cattleExist) {
        responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not found`);
        return responseHelper.response(res);
      }

      if (cattleExist) {
        if (cattleExist.farmerId !== req.farmer.id) {
          responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not belong to you`);
          return responseHelper.response(res);
        }

        const data = await cattleHelper.viewDailyCattleSlips('cattleId', req.params.cattleId);
        if (data.length === 0) {
          responseHelper.handleError(NOT_FOUND, `Cattle has no records yet`);
          return responseHelper.response(res);
        }

        if (data) {
          responseHelper.handleSuccess(OK, 'Daily Slips viewed successfully', data);
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

  static async viewDailyFamerSlips(req, res) {
    try {
      const cattleExist = await cattleHelper.cattleExist('farmerId', req.farmer.id);

      if (!cattleExist) {
        responseHelper.handleError(NOT_FOUND, 'Farmer has no any cattle');
        return responseHelper.response(res);
      }

      if (cattleExist) {
        if (cattleExist.farmerId !== req.farmer.id) {
          responseHelper.handleError(NOT_FOUND, `Cattles slip not belong to you`);
          return responseHelper.response(res);
        }

        const data = await cattleHelper.viewDailyCattleSlips('farmerId', req.farmer.id);
        if (data.length === 0) {
          responseHelper.handleError(NOT_FOUND, `Farmer has no records yet`);
          return responseHelper.response(res);
        }

        if (data) {
          responseHelper.handleSuccess(OK, 'Daily Slips viewed successfully', data);
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

  static async viewPeriodicallyCattleSlips(req, res) {
    try {
      const cattleExist = await cattleHelper.cattleExist('id', req.params.cattleId);

      if (!cattleExist) {
        responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not found`);
        return responseHelper.response(res);
      }

      if (cattleExist) {
        if (cattleExist.farmerId !== req.farmer.id) {
          responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not belong to you`);
          return responseHelper.response(res);
        }

        const data = await cattleHelper.viewPeriodicallyCattleSlips('cattleId', req.params.cattleId, req.body.range, req.body.period);
        if (data.length === 0) {
          responseHelper.handleError(NOT_FOUND, `Cattle has no records yet`);
          return responseHelper.response(res);
        }

        if (data) {
          responseHelper.handleSuccess(OK, 'Daily Slips viewed successfully', data);
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

  static async viewPeriodicallyFarmerSlips(req, res) {
    try {
      const data = await cattleHelper.viewPeriodicallyCattleSlips('farmerId', req.farmer.id, req.body.range, req.body.period);
      if (data.length === 0) {
        responseHelper.handleError(NOT_FOUND, `Farmer has no records yet`);
        return responseHelper.response(res);
      }

      if (data) {
        responseHelper.handleSuccess(OK, 'Daily Slips viewed successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewWeeklyCattleSlips(req, res) {
    try {
      const cattleExist = await cattleHelper.cattleExist('id', req.params.cattleId);

      if (!cattleExist) {
        responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not found`);
        return responseHelper.response(res);
      }

      if (cattleExist) {
        if (cattleExist.farmerId !== req.farmer.id) {
          responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not belong to you`);
          return responseHelper.response(res);
        }

        const data = await cattleHelper.viewWeeklyCattleSlips('cattleId', req.params.cattleId);
        if (data.length === 0) {
          responseHelper.handleError(NOT_FOUND, `Cattle has no records yet`);
          return responseHelper.response(res);
        }

        if (data) {
          responseHelper.handleSuccess(OK, 'Daily Slips viewed successfully', data);
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

  static async viewMonthlyCattleSlips(req, res) {
    try {
      const cattleExist = await cattleHelper.cattleExist('id', req.params.cattleId);

      if (!cattleExist) {
        responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not found`);
        return responseHelper.response(res);
      }

      if (cattleExist) {
        if (cattleExist.farmerId !== req.farmer.id) {
          responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not belong to you`);
          return responseHelper.response(res);
        }

        const data = await cattleHelper.viewMonthlyCattleSlips('cattleId', req.params.cattleId);
        if (data.length === 0) {
          responseHelper.handleError(NOT_FOUND, `Cattle has no records yet`);
          return responseHelper.response(res);
        }

        if (data) {
          responseHelper.handleSuccess(OK, 'Daily Slips viewed successfully', data);
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

  static async viewAnnualyCattleSlips(req, res) {
    try {
      const cattleExist = await cattleHelper.cattleExist('id', req.params.cattleId);

      if (!cattleExist) {
        responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not found`);
        return responseHelper.response(res);
      }

      if (cattleExist) {
        if (cattleExist.farmerId !== req.farmer.id) {
          responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not belong to you`);
          return responseHelper.response(res);
        }

        const data = await cattleHelper.viewAnnualyCattleSlips('cattleId', req.params.cattleId);
        if (data.length === 0) {
          responseHelper.handleError(NOT_FOUND, `Cattle has no records yet`);
          return responseHelper.response(res);
        }

        if (data) {
          responseHelper.handleSuccess(OK, 'Daily Slips viewed successfully', data);
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

  static async viewCattleAllSlips(req, res) {
    try {
      const cattleExist = await cattleHelper.cattleExist('id', req.params.cattleId);

      if (!cattleExist) {
        responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not found`);
        return responseHelper.response(res);
      }

      if (cattleExist) {
        if (cattleExist.farmerId !== req.farmer.id) {
          responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not belong to you`);
          return responseHelper.response(res);
        }

        const data = await cattleHelper.viewCattleAllSlips('cattleId', req.params.cattleId);
        if (data.length === 0) {
          responseHelper.handleError(NOT_FOUND, `Cattle has no records yet`);
          return responseHelper.response(res);
        }

        if (data) {
          responseHelper.handleSuccess(OK, 'Daily Slips viewed successfully', data);
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

  static async filterCattleSlips(req, res) {
    try {
      const cattleExist = await cattleHelper.cattleExist('id', req.params.cattleId);

      if (!cattleExist) {
        responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not found`);
        return responseHelper.response(res);
      }

      if (cattleExist) {
        if (cattleExist.farmerId !== req.farmer.id) {
          responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not belong to you`);
          return responseHelper.response(res);
        }

        const data = await cattleHelper.filterCattleSlips('cattleId', req.params.cattleId, req.body.from, req.body.to);
        if (data.length === 0) {
          responseHelper.handleError(NOT_FOUND, `Cattle has no records yet`);
          return responseHelper.response(res);
        }

        if (data) {
          responseHelper.handleSuccess(OK, 'Daily Slips viewed successfully', data);
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

  static async filterFarmerSlips(req, res) {
    try {
      const data = await cattleHelper.filterCattleSlips('farmerId', req.farmer.id, req.body.from, req.body.to);

      if (data.length === 0) {
        responseHelper.handleError(NOT_FOUND, `Farmer has no records yet`);
        return responseHelper.response(res);
      }

      if (data) {
        responseHelper.handleSuccess(OK, 'Daily Slips viewed successfully', data);
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

export default CattleController;
