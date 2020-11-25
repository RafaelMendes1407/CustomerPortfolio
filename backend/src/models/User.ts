import mongoose, { Document, Schema } from 'mongoose'

interface IUser extends Document {
  name: string,
  email: string,
  document: string,
  password: string
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
    unique: [true, 'User has already been registered']
  },
  password: {
    type: String,
    require: true,
    select: false
  }
})

export default mongoose.model<IUser>('User', UserSchema)
