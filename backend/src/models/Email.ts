import mongoose, { Document, Schema } from 'mongoose'

interface IEmail extends Document{
  id: string,
  email: string,
  domain: string
}

const EmailSchema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    require: true
  },
  email: { type: String, require: true, lowercase: true },
  domain: { type: String, require: true }
})

export default mongoose.model<IEmail>('Email', EmailSchema)
