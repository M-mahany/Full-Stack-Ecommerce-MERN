import Product from '../models/product'

const getProductsByCategory = async (queryName: string) => {
  try {
    const res = await Product.find({
      category: queryName,
    })
    return res
  } catch (err) {
    throw new Error(`error getting products Error: ${err}`)
  }
}

const getAllProducts = async () => {
  try {
    const res = await Product.find({})
    return res
  } catch (err) {
    throw new Error(`error getting products Error: ${err}`)
  }
}

export { getProductsByCategory, getAllProducts }
