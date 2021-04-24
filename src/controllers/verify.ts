import jwt from 'jsonwebtoken'
import { Response, Router } from 'express'
import User from '@/models/user'
import helper, { UserToken } from './controller_helper'
import config from '@/utils/config'

const verifyRouter = Router()

verifyRouter.post('/', async (request, response): Promise<Response | void> => {
  const token = helper.getTokenFrom(request)
  
  const decodedToken = jwt.verify(token as string, config.SECRET as string)
  
  if (!token || !(decodedToken as UserToken).id) {
    return response.status(401).json({ error: 'Token missing or invalid.' })
  }

  const user = await User.findById((decodedToken as UserToken).id)

  if (!user) {
    response.status(401).json({
      error: 'Invalid user.'
    })
    return
  }

  if (user.verified) {
    return response.status(401).json({
      error: 'User is already verified.'
    })
  }

  user.verified = true

  const savedUser = await user.save()
  response.json(savedUser.toJSON())
})

export default verifyRouter
