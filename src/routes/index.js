import Router from 'express';
import profileRouter from './profileRoute';

const router = Router();
router.use(profileRouter);

export default router;
