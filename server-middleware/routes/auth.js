import { Router } from 'express'
import User from '../models/User'

const router = Router()

router.post('/', async (req, res) => {
  const user = await User.findById(req.body.secret)
  if (!user) {
    res.status(401).send({ 'error': 'User not found!' })
  } else {
    res.json(user)
  }
})

export default router