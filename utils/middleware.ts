import { NextFunction, Request, Response } from 'express'
import logger from './logger'

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

const errorHandler = (error: Error, _request: Request, response: Response, next: NextFunction): void => {
  logger.error(error.message)
    
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id'})
    return
  } else if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message })
    return
  }

  next(error)
}

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
