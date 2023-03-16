import express, { Request, Response } from 'express'
import { S3Client } from '@aws-sdk/client-s3'
import multer from 'multer'
import multerS3 from 'multer-s3'
import dotenv from 'dotenv'

dotenv.config()

const s3Config = new S3Client({
  region: process.env.AWS_BUCKET_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
})

const upload = multer({
  storage: multerS3({
    acl: 'public-read',
    s3: s3Config,
    bucket: process.env.BUCKET_NAME as string,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}.${file.originalname}`)
    },
  }),
})

const uploadFileToS3Bucket = async (req: Request, res: Response) => {
  const { file } = req
  res.status(200).json(file)
}

export const AWS_ROUTE = (app: express.Application) => {
  app.post('/imageUploadAWS', upload.single('image'), uploadFileToS3Bucket)
}
