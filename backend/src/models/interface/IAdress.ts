import { Document } from 'mongoose'

export interface IAdress extends Document{
  clientId: string,
  city: string,
  street: string,
  number: number,
  neighbourhood: string,
  complement: string,
  country: string
}
