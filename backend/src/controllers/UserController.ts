import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

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
      return res.status(201).json(resUser)
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  public async getUser (req: Request, res: Response): Promise<Response> {
    const { email } = req.body
    const user = await User.findOne({ email: email })
    return res.send(user)
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

  public async updateUser (req: Request, res: Response): Promise<Response> {
    const { name, document, email } = req.body
    const id = req.params.id
    if (req.userId !== id) {
      return res.status(401).send({ error: 'unauthorized' })
    }
    try {
      if (!id || !name || !document || !email) {
        return res.status(400).send({ error: 'Mandatory fields not filled' })
      }
      const updateUser = await User.findOneAndUpdate({ _id: id }, { name: name, document: document, email: email }, { runValidators: true, new: true })
      return res.status(200).send(updateUser)
    } catch (error) {
      return res.status(400).send({ error: 'Error updating data' })
    }
  }

  public async changePass (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      const newPass = req.body.newPass
      const lastPass = req.body.password

      if (req.userId !== id) { return res.status(401).send({ error: 'unauthorized' }) }
      const user = await User.findById(id).select('+password')

      if (!await bcrypt.compare(lastPass, user!.password)) {
        return res.status(400).send({ error: 'Invalid password' })
      }

      const hash = await bcrypt.hash(newPass, 10)
      await User.findOneAndUpdate({ _id: id }, { password: hash }, { runValidators: true, new: true })
      const resUser = JSON.parse(JSON.stringify(user))
      delete resUser.password
      return res.status(200).send(resUser)
    } catch (error) {
      return res.status(400).send({ error: 'Could not change password' })
    }
  }
}

export default new UserController()
