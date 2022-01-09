import express from 'express';
import { ResizeController } from '../controllers/ResizeController';
import { ResizeMiddleware } from '../middlewares/ResizeMiddleware';

const routes = express.Router();

routes.get('/images', ResizeMiddleware.resizeImage, ResizeController.getResizedImage);

export default routes;
