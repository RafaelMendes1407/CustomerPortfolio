import { Router, Request, Response } from 'express'
import UserController from './controllers/UserController'
import bcrypt from 'bcrypt'
import User from './models/User'
import jwt from 'jsonwebtoken'

import authConfig from './config/auth.json'

const routes = Router()

routes.post('/users', UserController.newUser)

routes.post('/authenticate', async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')

  if (!user) { return res.status(400).send({ error: 'User not found' }) }
  if (!await bcrypt.compare(password, user.password)) {
    return res.status(400).send({ error: 'Invalid password' })
  }
  const resUser = JSON.parse(JSON.stringify(user))
  delete resUser.password
  const token = jwt.sign({ id: resUser._id }, authConfig.secret, {
    expiresIn: 86400
  })

  return res.send({ resUser, token })
})

export default routes
