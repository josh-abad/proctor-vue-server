import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import mongoosee from 'mongoose'
import config from './utils/config'
import usersRouter from './controllers/users'
import coursesRouter from './controllers/courses'
import examItemsRouter from './controllers/examItems'
import submitExamRouter from './controllers/submitExam'
import loginRouter from './controllers/login'
import logger from './utils/logger'
import middleware from './utils/middleware'
// import history from 'connect-history-api-fallback'

const connectToMongo = async () => {
  logger.info('connecting to', config.MONGODB_URI)
  try {
    await mongoosee.connect(config.MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    logger.info('connected to MongoDB')
  } catch (error) {
    logger.error('error connecting to MongoDB:', (error as Error).message)
  }
}

connectToMongo()

const app = express()

app.use(cors())
// app.use(history())
// app.use(express.static('build/dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/courses', coursesRouter)
app.use('/api/exam-items', examItemsRouter)
app.use('/api/submit-exam', submitExamRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
