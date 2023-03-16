import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const verifyTokenAuthorization = (
  req: Request,
  res: Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization
    const token: string | undefined = authorizationHeader?.split(
      ' '
    )[1] as string

    const decoded = jwt.verify(token, process.env.TOKEN_KEY as string)
    if ((<any>decoded).id !== req.params.userId) {
      throw new Error('You are not allowed userId mismatch')
    } else {
      next()
    }
  } catch (err) {
    res.status(401).json(`Invalid token ${err}`)
  }
}

export const verifyTokenAuthorizationAndAdmin = async (
  req: Request,
  res: Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization
    const token: string | undefined = authorizationHeader?.split(
      ' '
    )[1] as string

    const decoded = jwt.verify(token, process.env.TOKEN_KEY as string)

    if ((<any>decoded).id !== req.params.userId) {
      throw new Error('You are not allowed userId mismatch')
    } else {
      if ((<any>decoded).isAdmin as boolean) {
        next()
      } else {
        throw new Error('Your accound is not admin')
      }
    }
  } catch (err) {
    res.status(401).json(`access denied Invalid token Error:${err}`)
  }
}

export default { verifyTokenAuthorization, verifyTokenAuthorizationAndAdmin }
