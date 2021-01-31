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
import compression from 'compression'
import expressStaticGzip from 'express-static-gzip'
import verifyRouter from './controllers/verify'
import validateRouter from './controllers/validate'
import 'colors'

logger.info(' INFO '.bgCyan.black, 'Connecting to MongoDB...')

mongoosee.connect(config.MONGODB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  logger.info(' DONE '.bgGreen.black, 'Connected to MongoDB'.green)
}).catch(error => {
  logger.error(' ERROR '.bgRed.black, (error as Error).message.red)
})

const app = express()

app.use(compression())
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.socketIO)

app.use('/api/users', usersRouter)
app.use('/api/courses', coursesRouter)
app.use('/api/exams', examsRouter)
app.use('/api/exam-attempts', examAttemptsRouter)
app.use('/api/exam-results', examResultsRouter)
app.use('/api/login', loginRouter)
app.use('/api/verify', verifyRouter)
app.use('/api/validate', validateRouter)

app.use(history())
app.use('/', expressStaticGzip('public', {
  enableBrotli: true,
  customCompressions: [{
    encodingName: 'deflate',
    fileExtension: 'zz'
  }],
  orderPreference: ['br']
}))
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
