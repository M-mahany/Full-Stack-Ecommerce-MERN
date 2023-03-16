import express, { Request, Response } from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const saltRounds = parseInt(process.env.SALT_ROUNDS as string)
const pepper = process.env.PEPPER

export type user = {
  _id?: string
  firstName: string
  lastName: string
  username: string
  password: string
  email: string
  isAdmin?: boolean
}

const createUser = async (
  req: Request,
  res: Response
): Promise<user | void> => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password + pepper, saltRounds),
    email: req.body.email,
  })
  try {
    const savedUser = await newUser.save()
    res.status(200).json(savedUser)
  } catch (err) {
    res.status(400).json(err)
  }
}

const Login = async (req: Request, res: Response): Promise<user | void> => {
  const userPassword = req.body.password
  const user: user | null = await User.findOne({
    username: req.body.username,
  })
  if (!user) {
    res.status(404).json('username not found!')
  } else {
    if (bcrypt.compareSync(userPassword + pepper, user.password)) {
      const token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: '3d',
        }
      )
      res.status(200).json({ ...user, token })
    } else {
      res.status(400).json('Wrong password!')
    }
  }
}

const Auth_Routes = (app: express.Application) => {
  app.post('/auth/register', createUser)
  app.post('/auth/login', Login)
}

export default Auth_Routes
