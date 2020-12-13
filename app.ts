import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import mongoosee from 'mongoose'
import config from './utils/config'
import usersRouter from './controllers/users'
import loginRouter from './controllers/login'
import middleware from './utils/middleware'
// import history from 'connect-history-api-fallback'

const connectToMongo = async () => {
  console.log('connecting to', config.MONGODB_URI)
  try {
    await mongoosee.connect(config.MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log('connected to MongoDB')
  } catch (error) {
    console.error('error connecting to MongoDB:', (error as Error).message)
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
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
