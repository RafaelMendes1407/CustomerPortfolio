import { Document } from 'mongoose'

export interface IClient extends Document{
  name: string,
  document: string,
  createdBy: string
}

export interface IIdClient extends IClient{
  _id: string
}
