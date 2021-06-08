import express from 'express'
import db from './db'
import User from './models/User'
import SpeechExercise from './models/SpeechExercise'

const app = express()

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .get('/', async (req, res, next) => {
    const user = await User.findById('60be092ab6049b7a2c4df7d7')
    const id = user.exercises[0]
    const exercise = await SpeechExercise.findById(id)

    res.json(exercise.phrases)
  })
 
export default {
  path: '/exercise',
  handler: app
}