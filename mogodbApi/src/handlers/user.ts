import express, { Request, Response } from 'express'
import User from '../models/user'
import { user } from './auth'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import {
  verifyTokenAuthorization,
  verifyTokenAuthorizationAndAdmin,
} from '../middleware/JsonWebToken'

dotenv.config()

const saltRounds = parseInt(process.env.SALT_ROUNDS as string)
const pepper = process.env.PEPPER

const UpdateUser = async (
  req: Request,
  res: Response
): Promise<user | void> => {
  req.body.password
  if (req.body.password) {
    const hash = bcrypt.hashSync(req.body.password + pepper, saltRounds)
    const UpdatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          password: hash,
          email: req.body.email,
        },
      },
      { new: true }
    )
    res.status(200).json(UpdatedUser)
  } else {
    res.status(400).json('please enter password')
  }
}

const DeleteUser = async (
  req: Request,
  res: Response
): Promise<user | void> => {
  try {
    await User.findByIdAndDelete(req.params.userId)
    res.status(200).json('user deleted successfully....')
  } catch (err) {
    res.status(500).json(`userId not exists Error:${err}`)
  }
}

const GetUserById = async (
  req: Request,
  res: Response
): Promise<user | void> => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(`userId not exists Error:${err}`)
  }
}

const GetAllUsers = async (
  req: Request,
  res: Response
): Promise<user[] | void> => {
  try {
    const AllUsers = await User.find({})
    res.status(200).json(AllUsers)
  } catch (err) {
    res.status(500).json(`userId not exists Error:${err}`)
  }
}

const User_Routes = (app: express.Application) => {
  app.put('/:userId', verifyTokenAuthorization, UpdateUser)
  app.delete('/:userId', verifyTokenAuthorization, DeleteUser)
  app.get(
    '/:userId/userById/:id',
    verifyTokenAuthorizationAndAdmin,
    GetUserById
  )
  app.get('/:userId/users', verifyTokenAuthorizationAndAdmin, GetAllUsers)
}

export default User_Routes
