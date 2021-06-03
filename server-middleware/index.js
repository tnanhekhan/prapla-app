import express from 'express'
import db from './db'
import User from './models/User'
import SpeechExercise from './models/SpeechExercise'

const app = express()

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .get('/', async (req, res, next) => {
    const user = await User.findById('60b8df8bab775db676e6c62e')
    const id = user.exercises[0]
    const exercise = await SpeechExercise.findById(id)

    res.json(exercise.phrases)
  })
 
export default {
  path: '/exercise',
  handler: app
}