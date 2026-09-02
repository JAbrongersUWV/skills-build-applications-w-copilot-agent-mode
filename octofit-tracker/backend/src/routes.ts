import { Router, Request, Response } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

type Model = typeof User;

function createCollectionRouter(model: Model): Router {
  const router = Router();

  router.get('/', async (_request: Request, response: Response) => {
    try {
      const records = await model.find().lean();
      response.json(records);
    } catch (error) {
      response.status(503).json({ error: 'Data service unavailable' });
    }
  });

  router.post('/', async (request: Request, response: Response) => {
    try {
      const record = await model.create(request.body);
      response.status(201).json(record);
    } catch (error) {
      response.status(400).json({ error: 'Invalid request data' });
    }
  });

  return router;
}

export function createApiRouter(): Router {
  const apiRouter = Router();

  apiRouter.use('/users', createCollectionRouter(User));
  apiRouter.use('/teams', createCollectionRouter(Team));
  apiRouter.use('/activities', createCollectionRouter(Activity));
  apiRouter.use('/leaderboard', createCollectionRouter(Leaderboard));
  apiRouter.use('/workouts', createCollectionRouter(Workout));

  return apiRouter;
}