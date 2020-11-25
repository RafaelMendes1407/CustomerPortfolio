import { Router } from 'express';
import ClientController from './controllers/ClientController';

const routes = Router();

routes.get('/clients', ClientController.index);

export default routes;