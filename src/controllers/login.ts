import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from '@/models/user'
import config from '@/utils/config'

const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({ email: body.email }).populate('courses').select('+passwordHash')
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash ?? '')

  if (!(user && passwordCorrect)) {
    res.status(401).json({
      error: 'Invalid email or password.'
    })
    return
  }

  const userForToken = {
    email: user.email,
    id: user._id,
    role: user.role
  }

  const token = jwt.sign(userForToken, config.SECRET as string, { expiresIn: '14 days' })
  const userCopy = { ...user.toJSON() }
  delete userCopy.passwordHash

  res.status(200).send({ token, ...userCopy })
})

export default loginRouter
