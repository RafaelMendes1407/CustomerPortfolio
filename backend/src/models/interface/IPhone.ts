import { Document } from 'mongoose'

export interface IPhone extends Document{
  ClientId: string,
  phone: string,
  areaCode: number
}
