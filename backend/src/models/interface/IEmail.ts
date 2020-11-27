import { Document } from 'mongoose'

export interface IEmail extends Document{
  clientId: string,
  email: string,
  domain: string
}
