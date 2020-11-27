import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser extends Document {
  name: string,
  email: string,
  document: string,
  password: string
  createdAt: Date
}

const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    lowercase: true
  },
  document: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Erro by type Schema
UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

const User = mongoose.model<IUser>('User', UserSchema)

export default User
