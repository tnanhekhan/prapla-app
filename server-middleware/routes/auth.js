import { Router } from 'express'
import User from '../models/User'

const router = Router()

router.post('/', async (req, res) => {
  // Check if user exists in database
  const user = await User.findById(req.body.secret)
  if (!user) {
    res.status(401).send({ 'error': 'User not found!' })
  } else {
    req.session.user = user
    res.json(user)
  }
})

export default router