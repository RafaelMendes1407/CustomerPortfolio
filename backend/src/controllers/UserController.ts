import { Request, Response } from 'express'

import User from '../models/User'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const user = await User.find()
    return res.json(user)
  }

  public async newUser (req: Request, res: Response): Promise<Response> {
    const { email, document } = req.body
    try {
      if (await User.findOne({ email })) { return res.status(400).send({ error: 'User alread exists' }) }
      if (await User.findOne({ document })) { return res.status(400).send({ error: 'User alread exists' }) }
      const user = await User.create(req.body)
      const resUser = JSON.parse(JSON.stringify(user))
      delete resUser.password
      return res.json(resUser)
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  public async deleteUser (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      await User.findByIdAndDelete(id)
      return res.sendStatus(200)
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}

export default new UserController()
