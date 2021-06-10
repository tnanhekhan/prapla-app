import { Router } from 'express'
import SpeechExercise from '../models/SpeechExercise'
import VisualExercise from '../models/VisualExercise'
const router = Router()

// Show exercises to user
router.get('/', async (req, res, next) => {
  const user = req.session.user
  const id = user.exercises[0]
  // const exercise = await SpeechExercise.findById(id)
  const exercise = await VisualExercise.findById(id)
  res.json(exercise)
})

export default router