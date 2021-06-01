import { Router } from 'express'
import { authenticate } from '@/utils/middleware'

const verifyRouter = Router()

verifyRouter.post('/', authenticate, async (req, res) => {
  const user = req.user

  if (!user) {
    res.status(401).json({
      error: 'Invalid user.'
    })
    return
  }

  if (user.verified) {
    res.status(401).json({
      error: 'User is already verified.'
    })
    return
  }

  user.verified = true

  const savedUser = await user.save()
  res.json(savedUser.populate('courses').toJSON())
})

export default verifyRouter
