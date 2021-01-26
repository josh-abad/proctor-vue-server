import { S3 } from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION
})

const upload = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: process.env.S3_BUCKET as string,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (_request, file, callback) => {
      callback(null, { fieldName: file.fieldname })
    },
    key: (_request, file, callback) => {
      callback(null, `${Date.now().toString()}-${file.originalname}`)
    }
  })
})

export default upload
