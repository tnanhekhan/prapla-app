import { Router } from 'express'
import SpeechExercise from '../models/SpeechExercise'

const router = Router()

router.post('/', async (req, res) => {
  // Show exercises to user
  const user = req.body.user
  const id = user.exercises[0]
  const exercise = await SpeechExercise.findById(id)

  res.json(exercise.phrases)
})

export default router