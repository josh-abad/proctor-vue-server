import { NextFunction, Request, RequestHandler, Response } from 'express'
import logger from './logger'
import config from './config'
import jwt from 'jsonwebtoken'
import { UserToken } from '@/types'
import User from '@/models/user'

export const authenticate: RequestHandler = async (req, res, next): Promise<void> => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
  
    try {
      const decodedToken = jwt.verify(token, config.SECRET as string)
      req.user = await User.findById((decodedToken as UserToken).id) ?? undefined
      next()
    } catch (error) {
      res.sendStatus(401)
    }
  } else {
    res.sendStatus(401)
  }
}

const unknownEndpoint = (_req: Request, res: Response): void => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction): Response | void => {
  if (error.name === 'CastError') {
    return res.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message
    })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token has expired.'
    })
  }

  logger.error(error.message)

  next(error)
}

export default {
  authenticate,
  unknownEndpoint,
  errorHandler
}
