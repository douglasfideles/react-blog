import {Router} from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import BlogUserController from './app/controllers/BlogUserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import CategoryController from './app/controllers/CategoryController';
import BlogPostController from './app/controllers/BlogPostController';
import NotificationController from './app/controllers/NotificationController';

const upload = multer(multerConfig);
const routes = new Router();

routes.post('/users', BlogUserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', BlogUserController.update);

routes.get('/blogusers', BlogUserController.index);

routes.post('/blogcategory', CategoryController.store);
routes.get('/listblogcategory', CategoryController.index);

routes.post('/blogpost', BlogPostController.store);
routes.get('/blogpost', BlogPostController.index);
routes.delete('/blogpost/:id', BlogPostController.delete);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);


routes.post('/files', upload.single('file'), FileController.store);

export default routes;