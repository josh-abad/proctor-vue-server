import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import mongoosee from 'mongoose'
import config from './utils/config'
import usersRouter from './controllers/users'
import coursesRouter from './controllers/courses'
import examsRouter from './controllers/exams'
import examResultsRouter from './controllers/exam_results'
import examAttemptsRouter from './controllers/exam_attempts'
import loginRouter from './controllers/login'
import logger from './utils/logger'
import middleware from './utils/middleware'
import history from 'connect-history-api-fallback'
import path from 'path'
import compression from 'compression'

logger.info('connecting to', config.MONGODB_URI as string)

mongoosee.connect(config.MONGODB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  logger.info('connected to MongoDB')
}).catch(error => {
  logger.error('error connecting to MongoDB:', (error as Error).message)
})

const app = express()

app.use(compression())
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/courses', coursesRouter)
app.use('/api/exams', examsRouter)
app.use('/api/exam-attempts', examAttemptsRouter)
app.use('/api/exam-results', examResultsRouter)
app.use('/api/login', loginRouter)

app.use(history())
app.use(express.static(path.join(__dirname, 'public')))
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
