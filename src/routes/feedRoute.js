import Router from 'express';
import feed from '../controllers/feedController';
import { validateFeed } from '../middlewares/schemaMiddleware';
import { verifySesion } from '../middlewares/verifyMiddlewares';

const feedRouter = Router();
feedRouter
  .post('/feed-calculation', verifySesion, validateFeed, feed.feedCalucation);

export default feedRouter;
