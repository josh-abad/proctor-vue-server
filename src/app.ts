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
import verifyRouter from './controllers/verify'
import validateRouter from './controllers/validate'
import helmet from 'helmet'

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

app.use(helmet())
app.use(compression())
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/users', usersRouter)
app.use('/courses', coursesRouter)
app.use('/exams', examsRouter)
app.use('/exam-attempts', examAttemptsRouter)
app.use('/exam-results', examResultsRouter)
app.use('/login', loginRouter)
app.use('/verify', verifyRouter)
app.use('/validate', validateRouter)

app.use(history())

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
