import bcrypt from 'bcrypt'
import { Response, Router } from 'express'
import User from '../models/user'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import { sendVerificationEmail } from './email-helper'
import helper, { UserToken } from './controller_helper'
import config from '../utils/config'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    name: body.name,
    role: body.role || 'student',
    email: body.email,
    verified: false,
    avatarUrl: `http://gravatar.com/avatar/${md5(body.email.trim())}?d=https%3A%2F%2Ficon-library.com%2Fimages%2Fdefault-profile-icon%2Fdefault-profile-icon-16.jpg`,
    passwordHash
  })

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET as string, { expiresIn: '1h' })

  sendVerificationEmail(user.email, token)

  const savedUser = await user.save()
  response.json(savedUser.toJSON())
})

usersRouter.get('/', async (_request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.get('/:id', async (request, response): Promise<Response | void> => {
  const token = helper.getTokenFrom(request)

  // If token is sent with request, it's a request to re-authenticate user
  if (token) {
    const decodedToken = jwt.verify(token as string, config.SECRET)
    if (!(decodedToken as UserToken).id && request.params.id !== (decodedToken as UserToken).id) {
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

    return response.status(200).send({
      token: newToken,
      id: user.id,
      name: user.name,
      fullName: user.fullName,
      courses: user.courses,
      email: user.email,
      verified: user.verified,
      avatarUrl: user.avatarUrl,
      role: user.role
    })
  }
  
  const user = await User.findById(request.params.id)
  if (user){
    response.json(user)
  } else {
    response.status(404).end()
  }
})

usersRouter.put('/:id', async (request, response) => {
  const body = request.body

  const oldUser = await User.findById(request.params.id)
  if (oldUser) {
    oldUser.name = body.name || oldUser.name
    oldUser.courses = body.courses || oldUser.courses

    const updatedUser = await oldUser.save()
    response.json(updatedUser.toJSON())
  }
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

export default usersRouter
