import { SERVICE_UNAVAILABLE, INTERNAL_SERVER_ERROR, NOT_FOUND, CONFLICT, CREATED, OK } from 'http-status';
import responseHelper from '../Helpers/responseHelper';
import cattleHelper from '../Helpers/cattleHelper';

class CattleController {
  static async registerCattle(req, res) {
    try {
      const cattleExist = await cattleHelper.cattleExist('cattleUID', req.body.cattleUID);
      if (cattleExist) {
        responseHelper.handleError(CONFLICT, `Cattle with ${req.body.cattleUID} exist`);
        return responseHelper.response(res);
      }

      const data = await cattleHelper.saveCattle(req.body, req.farmer.id);
      if (data) {
        responseHelper.handleSuccess(CREATED, 'Cattle registered successfull', data);
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
        milking: await cattleHelper.countMilking(),
        heifer: await cattleHelper.countHeifer(),
        dry: await cattleHelper.countDry(),
        calf: await cattleHelper.countCalf(),
      };

      responseHelper.handleSuccess(OK, 'Cattle counted successfull', data);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async viewCattle(req, res) {
    try {
      const data = await cattleHelper.cattleExist('id', req.params.cattleId);

      if (data) {
        responseHelper.handleSuccess(OK, 'Cattle profile viewed successfull', data);
        return responseHelper.response(res);
      }

      if (!data) {
        responseHelper.handleError(NOT_FOUND, `Cattle profile with id ${req.params.cattleId} not found`);
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

      if (cattleExist) {
        const data = await cattleHelper.updateCattleProfile(req.params.cattleId, req.body);

        if (data) {
          responseHelper.handleSuccess(OK, 'Cattle profile viewed successfull', data);
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
          responseHelper.handleSuccess(CREATED, 'Slip saved successfull', data);
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
        if (req.body.shift) {
          const shiftExist = await cattleHelper.slipExist('shift', req.body.shift);
          if (shiftExist) {
            responseHelper.handleError(CONFLICT, `Cattle's ${req.body.shift} shift slip already saved`);
            return responseHelper.response(res);
          }
        }

        const cattleExist = await cattleHelper.cattleExist('id', slipExist.cattleId);
        if (!cattleExist || cattleExist.farmerId !== req.farmer.id) {
          responseHelper.handleError(NOT_FOUND, `Milk slip with id ${req.params.slipId} not found`);
          return responseHelper.response(res);
        }

        const data = await cattleHelper.updateCattleSlip(req.params.slipId, req.body);
        if (data) {
          responseHelper.handleSuccess(OK, 'Milk slip updated successfull', data);
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
          responseHelper.handleSuccess(OK, 'Daily Slips viewed successfull', data);
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

        const data = await cattleHelper.viewPeriodicallyCattleSlips('cattleId', req.params.cattleId, req.body.period);
        if (data.length === 0) {
          responseHelper.handleError(NOT_FOUND, `Cattle has no records yet`);
          return responseHelper.response(res);
        }

        if (data) {
          responseHelper.handleSuccess(OK, 'Daily Slips viewed successfull', data);
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
          responseHelper.handleSuccess(OK, 'Daily Slips viewed successfull', data);
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
          responseHelper.handleSuccess(OK, 'Daily Slips viewed successfull', data);
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
          responseHelper.handleSuccess(OK, 'Daily Slips viewed successfull', data);
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
          responseHelper.handleSuccess(OK, 'Daily Slips viewed successfull', data);
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
          responseHelper.handleSuccess(OK, 'Daily Slips viewed successfull', data);
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
}

export default CattleController;
