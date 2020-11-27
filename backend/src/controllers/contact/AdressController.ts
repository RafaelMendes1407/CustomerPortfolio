import { Request, Response } from 'express'

import { IAdress } from '../../models/interface/IAdress'

import Adress from '../../models/Adress'
import Client from '../../models/Client'

class AdressController {
  public async getAdress (req: Request, res: Response): Promise<Response> {
    const adress = await Adress.find()
    return res.json(adress)
  }

  public async deleteAdress (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      const clientAdress = await Adress.findById(id)
      const userId = req.userId
      const client = await Client.findById(clientAdress?.clientId)
      if (userId.toString().trim() !== client?.createdBy.toString().trim()) {
        return res.status(401).send({ error: 'unauthorized' })
      }
      await Adress.findByIdAndDelete(id)
      return res.sendStatus(200)
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  public async getAdressByClient (id: string): Promise<IAdress[]> {
    const adress = await Adress.find({ clientId: id })
    return adress
  }

  public async addAdress (req: Request, res: Response): Promise<Response> {
    const {
      clientId,
      complement,
      neighbourhood,
      street,
      number,
      city,
      country
    } = req.body

    try {
      if (!clientId || !complement || !street || !number || !city || !country || !neighbourhood) {
        return res.status(400).send({ error: 'Mandatory fields not filled' })
      }
      const newAdress = await Adress.create({
        clientId: clientId,
        number: number,
        complement: complement,
        neighbourhood: neighbourhood,
        street: street,
        city: city,
        country: country
      })
      return res.status(201).send(newAdress)
    } catch (error) {
      return res.status(400).send({ error: 'It was not possible to add new Adress' })
    }
  }

  public async updateAdress (req: Request, res: Response): Promise<Response> {
    const id = req.params.id
    const clientAdress = await Adress.findById(id)
    const userId = req.userId
    const client = await Client.findById(clientAdress?.clientId)
    if (userId.toString().trim() !== client?.createdBy.toString().trim()) {
      return res.status(401).send({ error: 'unauthorized' })
    }
    const {
      complement,
      neighbourhood,
      street,
      number,
      city,
      country
    } = req.body
    try {
      if (!id || !complement || !street || !number || !city || !country || !neighbourhood) {
        return res.status(400).send({ error: 'Mandatory fields not filled' })
      }
      const updateAdress = await Adress.findOneAndUpdate({ _id: id }, {
        number: number,
        complement: complement,
        neighbourhood: neighbourhood,
        street: street,
        city: city,
        country: country
      }, { runValidators: true, new: true })
      return res.status(200).send(updateAdress)
    } catch (error) {
      return res.status(400).send({ error: 'Error updating data' })
    }
  }
}

export default new AdressController()
