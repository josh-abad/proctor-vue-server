import jwt from 'jsonwebtoken'
import { Response, Router } from 'express'
import User from '@/models/user'
import helper from './controller-helper'
import config from '@/utils/config'
import { UserToken } from '@/types'

const verifyRouter = Router()

verifyRouter.post('/', async (req, res): Promise<Response | void> => {
  const token = helper.getTokenFrom(req)
  
  const decodedToken = jwt.verify(token as string, config.SECRET as string)
  
  if (!token || !(decodedToken as UserToken).id) {
    return res.status(401).json({ error: 'Token missing or invalid.' })
  }

  const user = await User.findById((decodedToken as UserToken).id)

  if (!user) {
    res.status(401).json({
      error: 'Invalid user.'
    })
    return
  }

  if (user.verified) {
    return res.status(401).json({
      error: 'User is already verified.'
    })
  }

  user.verified = true

  const savedUser = await user.save()
  res.json(savedUser.toJSON())
})

export default verifyRouter
