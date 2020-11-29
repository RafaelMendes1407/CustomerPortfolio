import mongoose, { Schema } from 'mongoose'

import { IClient } from './interface/IClient'

const ClientSchema = new Schema({
  name: { type: String, require: true },
  document: { type: String, require: true, unique: true }, // CPF ou CNPJ
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export default mongoose.model<IClient>('Client', ClientSchema)
