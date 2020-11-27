import { Document } from 'mongoose'

export interface IEmail extends Document{
  ClientId: string,
  email: string,
  domain: string
}
