import express, { Request, Response } from 'express'
import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: '2022-11-15',
})

const StripePayment = async (req: Request, res: Response) => {
  try {
    const resposne = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'USD',
    })
    res.status(200).json(resposne)
  } catch (err) {
    res.status(500).json(err)
  }
}

export const Stripe_Routes = (app: express.Application) => {
  app.post('/payment', StripePayment)
}
