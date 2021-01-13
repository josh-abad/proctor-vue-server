import { Response, Router } from 'express'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import helper, { UserToken } from './controller_helper'
import config from '../utils/config'

const validateRouter = Router()

validateRouter.post('/', async (request, response): Promise<Response | void> => {
  const token = helper.getTokenFrom(request)

  const decodedToken = jwt.verify(token as string, config.SECRET)
  if (!(decodedToken as UserToken).id) {
    return response.status(401).json({ error: 'Token is invalid.' })
  }

  const user = await User.findById((decodedToken as UserToken).id)

  if (!user) {
    return response.status(404).end()
  }

  const userForToken = {
    email: user.email,
    id: user._id,
    role: user.role
  }

  const newToken = jwt.sign(userForToken, process.env.SECRET as string, { expiresIn: '14 days' })

  return response.status(200).send({ ...user.toJSON(), token: newToken })
})

export default validateRouter
