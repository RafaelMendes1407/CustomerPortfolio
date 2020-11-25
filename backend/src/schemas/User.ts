import mongoose, { Document, Schema } from 'mongoose';

type User = Document;

const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  document: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
});

export default mongoose.model<User>('User', UserSchema);

