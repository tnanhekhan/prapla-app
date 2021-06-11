import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

// Setup the database connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'Can\' connect to database:'))
db.once('open', () => {
  console.log('MongoDB is connected!')
})

export default db