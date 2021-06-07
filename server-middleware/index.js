import express from 'express'
import session from 'express-session'
import db from './db'

import auth from './routes/auth'
import exercises from './routes/exercise'

const app = express()
app.locals.db = db

const sessionOptions = {
  ssaveUninitialized: true,
  secret: 'psst',
  store: session.MemoryStore()
}

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(session(sessionOptions))
  .use('/auth', auth)
  .use('/exercise', exercises)
 
export default {
  path: '/',
  handler: app
}