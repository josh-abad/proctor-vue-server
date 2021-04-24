import { NextFunction, Request, Response } from 'express'
import logger from './logger'

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
  unknownEndpoint,
  errorHandler
}
