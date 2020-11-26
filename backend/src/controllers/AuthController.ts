import { Router } from 'express'
import ClientController from './ClientController'
import UserController from './UserController'
import authMiddleware from '../middlewares/auth'

const routes = Router()
routes.use(authMiddleware)

// Client Routes
routes.get('/clients', ClientController.index)
routes.post('/clients', ClientController.newClient)
routes.delete('/clients/:id', ClientController.deleteClient)

// User Routes
routes.get('/users', UserController.index)
routes.delete('/users/:id', UserController.deleteUser)

export default routes
