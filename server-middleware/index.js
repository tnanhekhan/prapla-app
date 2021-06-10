import express from 'express'
import db from './db'
import cookieSession from 'cookie-session'
import auth from './routes/auth'
import exercises from './routes/exercise'

const app = express()
app.locals.db = db

// Set the session
const sessionOptions = {
  name: 'session',
  keys: ['Leren praten'],
  maxAge: 2 * 60 * 60 * 1000
}

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieSession(sessionOptions))
  .use('/auth', auth)
  .use('/exercise', exercises)

 
export default {
  path: '/',
  handler: app
}