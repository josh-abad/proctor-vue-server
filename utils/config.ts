import { config } from 'dotenv'

config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

const SECRET = process.env.SECRET as string

export default {
  PORT,
  MONGODB_URI,
  SECRET
}
