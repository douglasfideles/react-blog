import {Router} from 'express';
import multer from 'multer';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';


import multerConfig from './config/multer';
import redisConfig from './config/redis';
import BlogUserController from './app/controllers/BlogUserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import CategoryController from './app/controllers/CategoryController';
import BlogPostController from './app/controllers/BlogPostController';
import NotificationController from './app/controllers/NotificationController';
import UserInfoController from './app/controllers/UserInfoController';


const upload = multer(multerConfig);
const routes = new Router();
const bruteStore = new BruteRedis(redisConfig);
const bruteForce = new Brute(bruteStore);

routes.post('/users', BlogUserController.store);
routes.post('/sessions', bruteForce.prevent, SessionController.store);

routes.use(authMiddleware);
routes.put('/users', BlogUserController.update);

routes.get('/blogusers', BlogUserController.index);

routes.post('/userinfo', UserInfoController.store);
routes.put('/userinfo/:id', UserInfoController.update);


routes.post('/blogcategory', CategoryController.store);
routes.get('/listblogcategory', CategoryController.index);

routes.post('/blogpost', BlogPostController.store);
routes.get('/blogpost', BlogPostController.index);
routes.delete('/blogpost/:id', BlogPostController.delete);
routes.put('/blogpost/:id', BlogPostController.update);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);


routes.post('/files', upload.single('file'), FileController.store);

export default routes;