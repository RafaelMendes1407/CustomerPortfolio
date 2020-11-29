import { Request, Response } from 'express'

import { IEmail } from '../../models/interface/IEmail'

import Email from '../../models/Email'
import Client from '../../models/Client'

class EmailController {
  public async getEmail (req: Request, res: Response): Promise<Response> {
    const email = await Email.find()
    return res.json(email)
  }

  public async deleteEmail (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      const clientEmail = await Email.findById(id)
      const userId = req.userId
      const client = await Client.findById(clientEmail!.clientId)
      if (userId.toString().trim() !== client?.createdBy.toString().trim()) {
        return res.status(401).send({ error: 'unauthorized' })
      }
      await Email.findByIdAndDelete(id)
      return res.sendStatus(200)
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  public async getEmailByClient (id: string): Promise<IEmail[]> {
    const email = await Email.find({ clientId: id })
    return email
  }

  public async addEmail (req: Request, res: Response): Promise<Response> {
    const { clientId, email, domain } = req.body
    try {
      if (!!clientId || !!email || !!domain) { return res.status(400).send({ error: 'Mandatory fields not filled' }) }
      const newEmail = await Email.create({ clientId: clientId, email: email, domain: domain })
      return res.status(201).send(newEmail)
    } catch (error) {
      return res.status(400).send({ error: 'It was not possible to add new email' })
    }
  }

  public async updateEmail (req: Request, res: Response): Promise<Response> {
    const { email, domain } = req.body
    const id = req.params.id
    const clientEmail = await Email.findById(id)
    const userId = req.userId
    const client = await Client.findById(clientEmail?.clientId)
    if (userId.toString().trim() !== client?.createdBy.toString().trim()) {
      return res.status(401).send({ error: 'unauthorized' })
    }
    try {
      if (!id || !email || !domain) { return res.status(400).send({ error: 'Mandatory fields not filled' }) }
      const updateEmail = await Email.findOneAndUpdate({ _id: id }, { email: email, domain: domain }, { runValidators: true, new: true })
      return res.status(200).send(updateEmail)
    } catch (error) {
      return res.status(400).send({ error: 'Error updating data' })
    }
  }
}

export default new EmailController()
