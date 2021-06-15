import { Router } from 'express'
import Exercise from '../models/Exercise'
import User from '../models/User'

const router = Router()

router.post('/', async (req, res) => {
  // Show exercises to user
  const user = req.body.user
  const exercisesIDs = user.exercises.map(exercise => exercise._id)
  const exercises = await Exercise.find({ '_id': exercisesIDs })

  res.json(exercises)
})

router.post('/completed', async (req, res) => {
  const user = await User.findById(req.body.user._id)
})

export default router