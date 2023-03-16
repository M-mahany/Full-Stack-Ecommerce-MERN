import express, { Request, Response } from 'express'
import { verifyTokenAuthorization } from '../middleware/JsonWebToken'
import Cart from '../models/cart'
import {
  setProductQuantityDec,
  incrementProductQuantity,
  setProductQuantityInc,
  deleteCartProduct,
} from '../controllers/cart'

type cart = {
  userId: string
  products: (string | number)[]
  quantity: number
  price: number
  img: string
  title: string
}

const AddToCart = async (req: Request, res: Response): Promise<cart | void> => {
  const existCart = await Cart.findOne({
    userId: req.params.userId,
  })
  const existProduct = await Cart.findOne(
    { userId: req.params.userId, 'products._id': req.body.productId },
    {
      products: { $elemMatch: { _id: req.body.productId } },
    }
  )
  try {
    if (existCart) {
      if (existProduct) {
        await incrementProductQuantity(
          req.params.userId,
          req.body.productId,
          req.body.quantity
        )
        res.status(200).json('product quantity updated!')
      } else {
        const AddProductToCart = await Cart.findOneAndUpdate(
          {
            userId: req.params.userId,
          },
          {
            $addToSet: {
              products: {
                _id: req.body.productId,
                quantity: req.body.quantity,
                price: req.body.price,
                img: req.body.img,
                title: req.body.title,
              },
            },
          },
          { new: true }
        )
        res.status(200).json(AddProductToCart)
      }
    } else {
      const newCart = new Cart({
        userId: req.params.userId,
        products: {
          _id: req.body.productId,
          quantity: req.body.quantity,
          price: req.body.price,
          img: req.body.img,
          title: req.body.title,
        },
      })
      const savedCart = await newCart.save()
      res.status(200).json(savedCart)
    }
  } catch (err) {
    res.status(500).json('Error adding item to cart Error:' + err)
  }
}

const ProductQuantityDec = async (
  req: Request,
  res: Response
): Promise<cart | void> => {
  try {
    if (parseInt(req.body.quantity) > 1) {
      await setProductQuantityDec(req.params.userId, req.body.productId)
      res.status(200).json('product quantity Dec')
    } else {
      await deleteCartProduct(req.params.userId, req.body.productId)
      res.status(200).json('product removed from cart')
    }
  } catch (err) {
    res.status(500).json('Error Processing' + err)
  }
}
const deleteProductFromCart = async (
  req: Request,
  res: Response
): Promise<cart | void> => {
  try {
    await deleteCartProduct(req.params.userId, req.body.productId)
    res.status(200).json('product deleted successfully!')
  } catch (err) {
    res.status(400).json(`error proccessing Error:${err}`)
  }
}

const ProductQuantityInc = async (
  req: Request,
  res: Response
): Promise<cart | void> => {
  try {
    await setProductQuantityInc(req.params.userId, req.body.productId)
    res.status(200).json('product quantity Inc')
  } catch (err) {
    res.status(500).json('Error Processing' + err)
  }
}

const showCart = async (req: Request, res: Response): Promise<cart | void> => {
  try {
    const cart = await Cart.findOne({
      userId: req.params.userId,
    })
    res.status(200).json(cart)
  } catch (err) {
    res.status(404).json('unable to process cart Erro:' + err)
  }
}

const deleteCart = async (
  req: Request,
  res: Response
): Promise<cart | void> => {
  try {
    const deletedCart = await Cart.deleteOne({
      userId: req.params.userId,
    })
    res.status(200).json(deletedCart)
  } catch (err) {
    res.status(500).json('Error processing Request' + err)
  }
}

const Cart_Routes = (app: express.Application) => {
  app.post('/cart/:userId', verifyTokenAuthorization, AddToCart)
  app.put('/cartDec/:userId', verifyTokenAuthorization, ProductQuantityDec)
  app.put('/cartInc/:userId', verifyTokenAuthorization, ProductQuantityInc)
  app.get('/cart/:userId', verifyTokenAuthorization, showCart)
  app.delete('/cart/:userId', verifyTokenAuthorization, deleteCart)
  app.put(
    '/cart-product/:userId',
    verifyTokenAuthorization,
    deleteProductFromCart
  )
}

export default Cart_Routes
