import Router from 'express';
import authRouter from './authRoute';
import farmerRouter from './farmerRoute';
import cattleRouter from './cattleRoute';
import appointmentRouter from './appointmentRoute';

const router = Router();
router.use('/auth', authRouter);
router.use('/farmer', farmerRouter);
router.use('/cattle', cattleRouter);
router.use('/appointment', appointmentRouter);

export default router;
