import express, { Request, Response } from 'express'
import { getProductsByCategory, getAllProducts } from '../controllers/product'
import {
  verifyTokenAuthorization,
  verifyTokenAuthorizationAndAdmin,
} from '../middleware/JsonWebToken'
import Product from '../models/product'

export type product = {
  _id?: string
  sku?: string
  title: string
  desc: string
  img: string
  Categories?: string[]
  size?: string[]
  color?: string[]
  quantity: number
  price: number
  category: string
  soldBy: string
}
//Create
const CreateProduct = async (
  req: Request,
  res: Response
): Promise<product | void> => {
  const newProduct = new Product(req.body)
  try {
    const savedProduct = await newProduct.save()
    res.status(200).json(savedProduct)
  } catch (err) {
    res.status(400).json(err)
  }
}

//Update
const UpdateProduct = async (
  req: Request,
  res: Response
): Promise<product | void> => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(product)
  } catch (err) {
    res.status(404).json(err)
  }
}

//Delete
const DeleteProduct = async (
  req: Request,
  res: Response
): Promise<product | void> => {
  try {
    await Product.findByIdAndDelete(req.params.productId)
    res.status(200).json('Product Deleted Successfully')
  } catch (err) {
    res.status(404).json(err)
  }
}

//Get all
const fetchProduct = async (
  req: Request,
  res: Response
): Promise<product[] | void> => {
  const category = req.query.category as string
  try {
    if (!category) {
      const allProducts = await getAllProducts()
      res.status(200).json(allProducts)
    } else {
      const productByCategory = await getProductsByCategory(category)
      res.status(200).json(productByCategory)
    }
  } catch (err) {
    res.status(400).json(err)
  }
}
//Get by id
const productById = async (
  req: Request,
  res: Response
): Promise<product | void> => {
  try {
    const product = await Product.findById(req.params.productId)
    res.status(200).json(product)
  } catch (err) {
    res.status(404).json(err)
  }
}

const Product_Routes = (app: express.Application) => {
  app.post('/product/:userId', verifyTokenAuthorizationAndAdmin, CreateProduct)
  app.put(
    '/product/:productId/:userId',
    verifyTokenAuthorizationAndAdmin,
    UpdateProduct
  )
  app.delete(
    '/product/:productId/:userId',
    verifyTokenAuthorizationAndAdmin,
    DeleteProduct
  )
  app.get('/products', fetchProduct)
  app.get('/product/:productId', productById)
}

export default Product_Routes
