import mongoose, { Document, Schema } from 'mongoose'

interface IClient extends Document{
  name: string,
  document: string,
  createdBy: string
}

const ClientSchema = new Schema({
  name: { type: String, require: true },
  document: { type: String, require: true, unique: true }, // CPF ou CNPJ
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  }
})

export default mongoose.model<IClient>('Client', ClientSchema)
