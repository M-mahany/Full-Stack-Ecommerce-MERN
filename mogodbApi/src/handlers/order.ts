import express, { Request, Response } from 'express'
import {
  verifyTokenAuthorization,
  verifyTokenAuthorizationAndAdmin,
} from '../middleware/JsonWebToken'
import order from '../models/order'

export type order = {
  _id?: string
  userId: string
  products: (string | number)[]
  amount: number
  address?: (string | number)[]
  payment?: string
  status?: string
}

//Checkout by adding cart info to Order Schema
const Checkout = async (req: Request, res: Response): Promise<order | void> => {
  const userId = req.params.userId
  const products = req.body.products
  const amount = req.body.amount

  try {
    const existOrderPending = await order.findOne({
      userId: userId,
      status: 'pending',
    })
    if (!existOrderPending) {
      const newOrder = new order({
        userId: userId,
        products,
        amount: amount,
      })
      const savedOrder = await newOrder.save()

      res.status(200).json(savedOrder)
    } else {
      await order.updateOne(
        {
          userId: userId,
          status: 'pending',
        },
        {
          products,
          amount: amount,
        },
        { new: true }
      )
      res.status(200).json('order Updated Successfully!')
    }
  } catch (err) {
    res.status(400).json('cannot create order' + err)
  }
}

const fetchOrderByUser = async (
  req: Request,
  res: Response
): Promise<order | void> => {
  const userId = req.params.userId
  try {
    const response = await order.findOne({
      userId: userId,
      status: 'pending',
    })
    res.status(200).json(response)
  } catch (err) {
    res.status(400).json(`Error Fetching Order ${err}`)
  }
}

const updateCartAndComplete = async (
  req: Request,
  res: Response
): Promise<order | void> => {
  const address = req.body.address
  const payment = req.body.payment
  try {
    await order.findByIdAndUpdate(
      { _id: req.body.orderId },
      {
        $push: { address:  address  },
        payment: payment,
        status: 'packing',
      },
      { new: true }
    )
    res.status(200).json('order Completed')
  } catch (err) {
    res.status(400).json('unknown Error:' + err)
  }
}

const getAllOrders = async (
  req: Request,
  res: Response
): Promise<order[] | void> => {
  try {
    const orders = await order.find({})
    res.status(200).json(orders)
  } catch (err) {
    res.status(400).json('unable to load all orders' + err)
  }
}

export const Orders_Routes = (app: express.Application) => {
  app.post('/order/:userId', verifyTokenAuthorization, Checkout)
  app.get('/order/:userId', verifyTokenAuthorization, fetchOrderByUser)
  app.put('/order/:userId', verifyTokenAuthorization, updateCartAndComplete)
  app.get('/allOrders/:userId', verifyTokenAuthorizationAndAdmin, getAllOrders)
}
