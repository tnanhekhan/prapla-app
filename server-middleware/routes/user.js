import { Router } from 'express'

const router = Router()

router.get('/', async (req, res, next) => {
  if (!req.session.user) {
    const user = await User.findById(req.session.user)
    res.json(user)
  } else {
    console.error('You\'re not authorized')
  }
})