import {Router} from 'express';

import BlogUser from './app/models/BlogUser';
import BlogUserController from './app/controllers/BlogUserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';


const routes = new Router();

routes.post('/users', BlogUserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', BlogUserController.update);

export default routes;