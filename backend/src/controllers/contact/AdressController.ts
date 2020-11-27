import { Request, Response } from 'express'

import { IAdress } from '../../models/interface/IAdress'

import Adress from '../../models/Adress'

class AdressController {
  public async getAdress (req: Request, res: Response): Promise<Response> {
    const adress = await Adress.find()
    return res.json(adress)
  }

  public async deleteAdress (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      await Adress.findByIdAndDelete(id)
      return res.sendStatus(200)
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  public async getAdressByClient (id: string): Promise<IAdress[]> {
    const adress = await Adress.find({ ClientId: id })
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
        ClientId: clientId,
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
    const {
      complement,
      neighbourhood,
      street,
      number,
      city,
      country
    } = req.body
    const id = req.params.id
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
