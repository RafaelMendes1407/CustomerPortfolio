import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/clients', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connection success'));

export default db;