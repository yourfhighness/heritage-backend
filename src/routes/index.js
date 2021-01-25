import Router from 'express';
import farmerRouter from './farmerRoute';
import cattleRouter from './cattleRoute';

const router = Router();
router.use(farmerRouter);
router.use(cattleRouter);

export default router;
