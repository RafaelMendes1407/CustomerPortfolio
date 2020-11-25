import mongoose, { Document, Schema } from 'mongoose';

type Client = Document;

const AdressSchema = new Schema({
  city: { type: String, require: true },
  street: { type: String, require: true },
  number: { type: Number, require: true },
  neighborhood: { type: String, require: true },
  complement: { type: String, require: true },
  country: { type: String, require: true },
});

const PhoneSchema = new Schema({
  phone: { type: String, require: true },
  area_code: {type: Number, require: true }
})

const EmailSchema = new Schema({
  email: { type: String, require: true },
  domain: { type: String require: true}
});


const ClientSchema = new Schema({
  client: {
    name: { type: String, require: true },
    document: { type: String, require: true, unique: true }, //CPF ou CNPJ
    email: { type: String, require: true },
    adress: [AdressSchema],
    contact: {
      phone: [PhoneSchema],
      email: [EmailSchema]
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
    }

  }
});

export default mongoose.model<Client>('Client', ClientSchema);