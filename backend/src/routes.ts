import { Router } from 'express'
import ClientController from './controllers/ClientController'
import UserController from './controllers/UserController'

const routes = Router()

// Client Routes
routes.get('/clients', ClientController.index)
routes.post('/clients', ClientController.newClient)
routes.delete('/clients/:id', ClientController.deleteClient)

// User Routes
routes.get('/users', UserController.index)
routes.post('/users', UserController.newUser)

export default routes
