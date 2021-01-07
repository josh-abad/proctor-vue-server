import jwt from 'jsonwebtoken'
import { Response, Router } from 'express'
import User from '../models/user'
import helper, { UserToken } from './controller_helper'
import config from '../utils/config'

const verifyRouter = Router()

verifyRouter.post('/', async (request, response): Promise<Response | void> => {
  const token = helper.getTokenFrom(request)
  
  const decodedToken = jwt.verify(token as string, config.SECRET)
  
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

  const dateNow = new Date()
  
  const tokenTime = (decodedToken as { iat: number }).iat * 1000

  const hours = 2
  const tokenLife = hours * 3600 * 1000

  if (tokenTime + tokenLife < dateNow.getTime()) {
    return response.status(401).json({
      error: 'Verification has expired.'
    })
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
