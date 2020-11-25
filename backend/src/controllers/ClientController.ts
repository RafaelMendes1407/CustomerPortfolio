import { Request, Response } from 'express'

import Client from '../models/Client'

class ClientController {
  public async index (req: Request, res: Response): Promise<Response> {
    const clients = await Client.find()
    return res.json(clients)
  }

  public async newClient (req: Request, res: Response): Promise<Response> {
    try {
      const newClient = await Client.create(req.body)
      return res.send({ newClient })
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  }

  public async deleteClient (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      await Client.deleteOne({ _id: id })
      return res.sendStatus(200)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new ClientController()
