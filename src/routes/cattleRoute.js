import Router from 'express';
import cattle from '../controllers/cattleController';

const cattleRouter = Router();
cattleRouter
  .get('/count-cattles', cattle.countCattles);

export default cattleRouter;
