import { NextFunction, Request, Response } from 'express'
import logger from './logger'
import io from '../index'

const socketIO = (request: Request, _response: Response, next: NextFunction): void => {
  request.io = io
  next()
}

const requestLogger = (request: Request, _response: Response, next: NextFunction): void => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_request: Request, response: Response): void => {
  response.status(404).send({ error: 'unknown endpoint'})
}

const errorHandler = (error: Error, _request: Request, response: Response, next: NextFunction): Response | void => {
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'Token has expired.'
    })
  }

  logger.error(error.message)

  next(error)
}

export default {
  socketIO,
  requestLogger,
  unknownEndpoint,
  errorHandler
}
