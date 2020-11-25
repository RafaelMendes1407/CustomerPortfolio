import mongoose, { Document, Schema } from 'mongoose'

interface IPhone extends Document{
  id: string,
  phone: string,
  areaCode: number
}

const PhoneSchema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    require: true
  },
  phone: { type: String, require: true },
  areaCode: { type: Number, require: true }
})

export default mongoose.model<IPhone>('Phone', PhoneSchema)
