import mongoose from 'mongoose'

const port = 27017

mongoose.connect(`mongodb://localhost:${port}/clients`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => console.log('Connection success'))

export default db
