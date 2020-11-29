import mongoose, { Schema } from 'mongoose'
import { IPhone } from './interface/IPhone'

const PhoneSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  phone: [{
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      require: true
    },
    phones: [{
      phone: { type: String, require: true },
      areaCode: { type: Number, require: true }
    }]
  }]
})

export default mongoose.model<IPhone>('Phone', PhoneSchema)
