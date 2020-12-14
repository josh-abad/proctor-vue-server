import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from '../models/user'

const loginRouter = Router()

loginRouter.post('/', (request, response) => {
  const body = request.body

  User.findOne({ username: body.username }).select('+passwordHash').exec(async (_error, user) => {
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      response.status(401).json({
        error: 'invalid username or password'
      })
      return
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET as string)

    response.status(200).send({ token, id: user.id, username: user.username, name: user.name, courses: user.courses })
  })
})

export default loginRouter
