import mongoose, { Document, Schema } from 'mongoose'

interface IAdress extends Document{
  id: string,
  city: string,
  street: string,
  number: number,
  neighbourhood: string,
  complement: string,
  country: string
}

const AdressSchema = new Schema({
  id: {
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
