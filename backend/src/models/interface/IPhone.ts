import { Document } from 'mongoose'

export interface IPhone extends Document{
  clientId: string,
  phone: string,
  areaCode: number
}
