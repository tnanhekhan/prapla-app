const mongoose = require('mongoose')

// Require the models
const User = require('./userModel')

require('dotenv').config()

// Define db.
let db

// Initialize MongoDB
const dbUrl = process.env.DB_URL

// Connect to the Database
mongoose.connect(dbUrl, {
  // Prevent connection error
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

// Set db to this connection
db = mongoose.connection

// When database is connected
db.on('connected', () => {
  console.log(`Connected!`)
})

// Log the error if error
db.on('error', err => console.log(`MongoDB connection error: ${err}`))

async function userVariables(req, res, next) {
  const users = await User.getUsers()
  next()
}

module.exports = { db, userVariables }