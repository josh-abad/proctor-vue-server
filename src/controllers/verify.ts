import jwt from 'jsonwebtoken'
import { Router } from 'express'
import User from '@/models/user'
import helper from './controller-helper'
import config from '@/utils/config'
import { UserToken } from '@/types'

const verifyRouter = Router()

verifyRouter.post('/', async (req, res) => {
  const token = helper.getTokenFrom(req)
  
  const decodedToken = jwt.verify(token as string, config.SECRET as string)
  
  if (!token || !(decodedToken as UserToken).id) {
    res.status(401).json({ error: 'Token missing or invalid.' })
    return
  }

  const user = await User.findById((decodedToken as UserToken).id)

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
  res.json(savedUser.toJSON())
})

export default verifyRouter
