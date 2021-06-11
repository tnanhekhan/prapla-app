import { Router } from 'express'
import Exercise from '../models/Exercise'
import User from '../models/User'

const router = Router()

// Show exercises to user
router.get('/', async (req, res) => {
  const user = req.session.user
  const exercises = await Exercise.find({ '_id': user.exercises })

  res.json(exercises)
})

router.post('/completed', async (req, res) => {
  const user = await User.findById(req.body.user._id)
  console.log(user)
})

export default router