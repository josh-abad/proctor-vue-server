import bcrypt from 'bcrypt'
import { Response, Router } from 'express'
import User from '../models/user'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import { sendVerificationEmail } from './email-helper'
import upload from '../utils/image-upload'

const usersRouter = Router()

usersRouter.post('/', async (request, response): Promise<Response | void> => {
  const body = request.body

  const emailExists = await User.exists({ email: body.email })
  if (emailExists) {
    return response.status(401).json({
      error: 'Email is already taken.'
    })
  }

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

usersRouter.post('/:id/reference-image', upload.single('image'), async (request, response) => {
  const filename = (request.file as Express.MulterS3.File).key
  const referenceImageUrl = `${process.env.CLOUDFRONT_DOMAIN}${filename}`

  const updatedUser = await User.findByIdAndUpdate(request.params.id, { referenceImageUrl }, { new: true })
  response.json(updatedUser)
})

export default usersRouter
