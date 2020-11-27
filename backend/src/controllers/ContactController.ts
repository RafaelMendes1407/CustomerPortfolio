import { Request, Response } from 'express'

import { IAdress } from '../models/interface/IAdress'
import { IPhone } from '../models/interface/IPhone'
import { IEmail } from '../models/interface/IEmail'

import Phone from '../models/Phone'
import Email from '../models/Email'
import Adress from '../models/Adress'

class ContactController {
  public async getPhone (req: Request, res: Response): Promise<Response> {
    const phone = await Phone.find()
    return res.json(phone)
  }

  public async getEmail (req: Request, res: Response): Promise<Response> {
    const email = await Email.find()
    return res.json(email)
  }

  public async getAdress (req: Request, res: Response): Promise<Response> {
    const adress = await Adress.find()
    return res.json(adress)
  }

  public async deletePhone (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      await Phone.findByIdAndDelete(id)
      return res.sendStatus(200)
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  public async deleteEmail (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      await Email.findByIdAndDelete(id)
      return res.sendStatus(200)
    } catch (error) {
      return res.status(400).send(error)
    }
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

  public async getPhoneByClient (id: string): Promise<IPhone[]> {
    const phone = await Phone.find({ ClientId: id })
    return phone
  }

  public async getEmailByClient (id: string): Promise<IEmail[]> {
    const email = await Email.find({ ClientId: id })
    return email
  }

  public async getAdressByClient (id: string): Promise<IAdress[]> {
    const adress = await Adress.find({ ClientId: id })
    return adress
  }
}

export default new ContactController()
