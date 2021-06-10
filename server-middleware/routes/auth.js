import { Router } from 'express'
import User from '../models/User'

const router = Router()

// Route when authorized
router.get('/:secret', async (req, res, next) => {
  const user = await User.findById(req.params.secret)
  if (user) {
    req.session.user = user
    res.json(user)
  }
})

export default router