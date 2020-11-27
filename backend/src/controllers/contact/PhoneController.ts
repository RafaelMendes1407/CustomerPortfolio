import { Request, Response } from 'express'

import { IPhone } from '../../models/interface/IPhone'

import Phone from '../../models/Phone'

class PhoneController {
  public async getPhone (req: Request, res: Response): Promise<Response> {
    const phone = await Phone.find()
    return res.json(phone)
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

  public async getPhoneByClient (id: string): Promise<IPhone[]> {
    const phone = await Phone.find({ ClientId: id })
    return phone
  }

  public async addPhone (req: Request, res: Response): Promise<Response> {
    const { clientId, phone, areaCode } = req.body
    try {
      if (!clientId || !phone || !areaCode) {
        return res.status(400).send({ error: 'Mandatory fields not filled' })
      }
      const newPhone = await Phone.create({ ClientId: clientId, phone: phone, areaCode: areaCode })
      return res.status(201).send(newPhone)
    } catch (error) {
      return res.status(400).send({ error: 'It was not possible to add new Phone' })
    }
  }

  public async updatePhone (req: Request, res: Response): Promise<Response> {
    const { phone, areaCode } = req.body
    const id = req.params.id
    try {
      if (!id || !phone || !areaCode) {
        return res.status(400).send({ error: 'Mandatory fields not filled' })
      }
      const updatePhone = await Phone.findOneAndUpdate({ _id: id }, { phone: phone, areaCode: areaCode }, { runValidators: true, new: true })
      return res.status(200).send(updatePhone)
    } catch (error) {
      return res.status(400).send({ error: 'Error updating data' })
    }
  }
}

export default new PhoneController()
