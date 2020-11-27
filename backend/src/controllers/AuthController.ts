import { Router } from 'express'
import ClientController from './ClientController'
import UserController from './UserController'
import ContactController from './ContactController'
import authMiddleware from '../middlewares/auth'

const routes = Router()
routes.use(authMiddleware)

// Client Routes
routes.get('/clients', ClientController.index)
routes.get('/clients/:id', ClientController.getClient)
routes.post('/clients', ClientController.newClient)
routes.delete('/clients/:id', ClientController.deleteClient)

// User Routes
routes.get('/users', UserController.index)
routes.delete('/users/:id', UserController.deleteUser)

// Contact Routes
routes.get('/phone', ContactController.getPhone)
routes.get('/email', ContactController.getEmail)
routes.get('/adress', ContactController.getAdress)
routes.delete('/phone/:id', ContactController.deletePhone)
routes.delete('/email/:id', ContactController.deleteEmail)
routes.delete('/adress/:id', ContactController.deleteAdress)

export default routes
