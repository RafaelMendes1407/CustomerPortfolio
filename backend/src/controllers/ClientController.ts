import { Request, Response } from 'express'

import Client from '../models/Client'
import Phone from '../models/Phone'
import Email from '../models/Email'
import Adress from '../models/Adress'

class ClientController {
  public async index (req: Request, res: Response): Promise<Response> {
    const clients = await Client.find()
    return res.json(clients)
  }

  public async newClient (req: Request, res: Response): Promise<Response> {
    const userId = req.userId
    try {
      const data = req.body
      const newClient = await Client.create({
        name: data.client.name,
        document: data.client.document,
        createdBy: userId
      })
      const id = newClient._id
      await Phone.create({
        ClientId: id,
        phone: data.phone.phone,
        areaCode: data.phone.areaCode
      })
      await Email.create({
        ClientId: id,
        email: data.email.email,
        domain: data.email.domain
      })
      const adress = data.adress
      await Adress.create({
        ClientId: id,
        city: adress.city,
        street: adress.street,
        number: adress.number,
        neighbourhood: adress.neighbourhood,
        complement: adress.complement,
        country: adress.country
      })
      return res.send({ newClient })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  public async deleteClient (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      await Client.findByIdAndDelete(id)
      return res.sendStatus(200)
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}

export default new ClientController()
