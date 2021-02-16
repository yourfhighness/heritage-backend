import Router from 'express';
import authRouter from './authRoute';
import adminRouter from './adminRoute';
import farmerRouter from './farmerRoute';
import cattleRouter from './cattleRoute';
import doctorRouter from './doctorRoute';
import appointmentRouter from './appointmentRoute';

const router = Router();
router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/farmer', farmerRouter);
router.use('/cattle', cattleRouter);
router.use('/doctor', doctorRouter);
router.use('/appointment', appointmentRouter);

export default router;
