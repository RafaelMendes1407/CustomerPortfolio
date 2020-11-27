import { Request, Response } from 'express'

import PhoneController from './contact/PhoneController'
import EmailController from './contact/EmailController'
import AdressController from './contact/AdressController'

import Client from '../models/Client'
import Phone from '../models/Phone'
import Email from '../models/Email'
import Adress from '../models/Adress'

class ClientController {
  public async index (req: Request, res: Response): Promise<Response> {
    const user = req.userId
    const clients = await Client.find({ createdBy: user })
    return res.json(clients)
  }

  public async getClient (req: Request, res: Response): Promise<Response> {
    const userId = req.userId
    const id = req.params.id
    const client = await Client.findById(id)
    if (userId.toString().trim() !== client?.createdBy.toString().trim()) {
      return res.status(401).send({ error: 'unauthorized' })
    }
    const clientId = JSON.parse(JSON.stringify(client))
    const phones = await PhoneController.getPhoneByClient(clientId._id) // TODO
    const email = await EmailController.getEmailByClient(clientId._id)
    const adress = await AdressController.getAdressByClient(clientId._id)
    const clientInfo = {
      client: client,
      phone: phones,
      email: email,
      adress: adress
    }
    return res.json(clientInfo)
  }

  public async newClient (req: Request, res: Response): Promise<Response> {
    const userId = req.userId
    try {
      const data = req.body
      const newClient = await Client.create({
        name: data.client.name,
        document: data.client.document,
        createdBy: userId.toString()
      })
      const id = newClient._id
      await Phone.create({
        clientId: id,
        phone: data.phone.phone,
        areaCode: data.phone.areaCode
      })
      await Email.create({
        clientId: id,
        email: data.email.email,
        domain: data.email.domain
      })
      const adress = data.adress
      await Adress.create({
        clientId: id,
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
      const userId = req.userId

      const client = await Client.findById(id)
      if (userId.toString().trim() !== client?.createdBy.toString().trim()) {
        return res.status(401).send({ error: 'unauthorized' })
      }
      await Client.findByIdAndDelete(id)
      await Phone.deleteMany({ clientId: id })
      await Email.deleteMany({ clientId: id })
      await Adress.deleteMany({ clientId: id })
      return res.sendStatus(200)
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  public async updateClient (req: Request, res: Response): Promise<Response> {
    const { name, document } = req.body
    const id = req.params.id
    const userId = req.userId
    const client = await Client.findById(id)
    if (userId.toString().trim() !== client?.createdBy.toString().trim()) {
      return res.status(401).send({ error: 'unauthorized' })
    }
    try {
      if (!id || !name || !document) {
        return res.status(400).send({ error: 'Mandatory fields not filled' })
      }
      const updateClient = await Client.findOneAndUpdate({ _id: id }, { name: name, document: document }, { runValidators: true, new: true })
      return res.status(200).send(updateClient)
    } catch (error) {
      return res.status(400).send({ error: 'Error updating data' })
    }
  }
}

export default new ClientController()
