import { config } from 'dotenv'

config()

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT ?? 3001
const S3_BUCKET = process.env.S3_BUCKET
const S3_REGION = process.env.S3_REGION
const SECRET = process.env.SECRET

export default {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  CLOUDFRONT_DOMAIN,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  MONGODB_URI,
  PORT,
  S3_BUCKET,
  S3_REGION,
  SECRET
}
