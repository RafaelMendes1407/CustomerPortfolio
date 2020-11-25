import { Request, Response } from 'express'

import User from '../models/User'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const user = await User.find()
    return res.json(user)
  }

  public async newUser (req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.create(req.body)
      return res.json(user)
    } catch (error) {
      return res.send(error)
    }
  }
}

export default new UserController()
