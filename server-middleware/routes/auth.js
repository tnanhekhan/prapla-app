import { Router } from 'express'
import User from '../models/User'

const router = Router()

router.post('/', async (req, res) => {
  const user = await User.findById(req.body.secret)
  req.session.user = user
  res.json(user)
})

export default router