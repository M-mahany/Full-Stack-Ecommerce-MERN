import { userRquest } from './ApiRequest'

export const fetchCart = async (setProducts, user) => {
  try {
    const response = await userRquest.get(`/cart/${user}`)
    const productsData = await response.data.products
    setProducts(productsData)
  } catch (err) {
    console.log(err)
  }
}
