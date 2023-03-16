import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Auth_Routes from './handlers/auth'
import Product_Routes from './handlers/product'
import User_Routes from './handlers/user'
import Cart_Routes from './handlers/cart'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Orders_Routes } from './handlers/order'
import { Stripe_Routes } from './handlers/stripe'
import { AWS_ROUTE } from './handlers/awsUpload'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())
Auth_Routes(app)
User_Routes(app)
Product_Routes(app)
Cart_Routes(app)
Orders_Routes(app)
Stripe_Routes(app)
AWS_ROUTE(app)

mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log('mongodb is connected!'))

app.get('/', (_req: Request, res: Response) => {
  res.send('Main Api Endpoint')
})

app.listen(port, () => {
  console.log(`app is connected successfully to server ${port}`)
})

export default app
