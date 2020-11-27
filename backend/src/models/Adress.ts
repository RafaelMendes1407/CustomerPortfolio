import mongoose, { Schema } from 'mongoose'
import { IAdress } from './interface/IAdress'

const AdressSchema = new Schema({
  ClientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    require: true
  },
  city: { type: String, require: true },
  street: { type: String, require: true },
  number: { type: Number, require: true },
  neighborhood: { type: String, require: true },
  complement: { type: String, require: true },
  country: { type: String, require: true }
})

export default mongoose.model<IAdress>('Adress', AdressSchema)
