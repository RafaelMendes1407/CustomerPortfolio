import { Router } from 'express'
import ClientController from './ClientController'
import UserController from './UserController'
import authMiddleware from '../middlewares/auth'

import PhoneController from './contact/PhoneController'
import EmailController from './contact/EmailController'
import AdressController from './contact/AdressController'

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

// Contact Routes: Phone
routes.get('/phone', PhoneController.getPhone)
routes.post('/phone', PhoneController.addPhone)
routes.delete('/phone/:id', PhoneController.deletePhone)
routes.put('/phone/:id', PhoneController.updatePhone)

// Contact Routes: Email
routes.get('/email', EmailController.getEmail)
routes.delete('/email/:id', EmailController.deleteEmail)
routes.post('/email', EmailController.addEmail)
routes.put('/email/:id', EmailController.updateEmail)

// Contact Routes: Adress
routes.delete('/adress/:id', AdressController.deleteAdress)
routes.get('/adress', AdressController.getAdress)
routes.post('/adress', AdressController.addAdress)
routes.put('/adress/:id', AdressController.updateAdress)

export default routes
