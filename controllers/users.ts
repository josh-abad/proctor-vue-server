import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from '../models/user'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    name: body.name,
    username: body.username,
    passwordHash
  })
  const savedPerson = await user.save()
  response.json(savedPerson.toJSON())
})

usersRouter.get('/', async (_request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user){
    response.json(user)
  } else {
    response.status(404).end()
  }
})

usersRouter.put('/:id', async (request, response) => {
  const body = request.body

  const user = {
    name: body.name,
    username: body.username,
    passwordHash: body.passwordHash
  }

  const updatedPerson = await User.findByIdAndUpdate(request.params.id, user, {
    new: true,
    runValidators: true,
    context: 'query'
  })
  response.json(updatedPerson)
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

export default usersRouter
