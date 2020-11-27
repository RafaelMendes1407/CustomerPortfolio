import mongoose, { Schema } from 'mongoose'
import { IEmail } from './interface/IEmail'

const EmailSchema = new Schema({
  ClientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    require: true
  },
  email: { type: String, require: true, lowercase: true },
  domain: { type: String, require: true }
})

export default mongoose.model<IEmail>('Email', EmailSchema)
