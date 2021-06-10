import { Router } from 'express'
import Exercise from '../models/Exercise'

const router = Router()

// Show exercises to user
router.get('/', async (req, res, next) => {
  const user = req.session.user
  const id = user.exercises[0]
  const exercise = await Exercise.findById(id)
  res.json(exercise)
})

export default router