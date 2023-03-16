import Cart from '../models/cart'

type cart = {
  _id?: string
  userId: string
  products: (string | number)[]
}

const incrementProductQuantity = async (
  userId: string,
  productId: (string | number)[],
  quantity: number
): Promise<cart | void> => {
  await Cart.updateOne(
    {
      userId: userId,
      'products._id': productId,
    },

    {
      $inc: { 'products.$.quantity': +quantity },
    },
    { new: true }
  )
}

const setProductQuantityDec = async (userId: string, productId: string) => {
  await Cart.updateOne(
    {
      userId: userId,
      'products._id': productId,
    },
    {
      $inc: { 'products.$.quantity': -1 },
    },
    { new: true }
  )
}

const setProductQuantityInc = async (userId: string, productId: string) => {
  await Cart.updateOne(
    {
      userId: userId,
      'products._id': productId,
    },
    {
      $inc: { 'products.$.quantity': +1 },
    },
    { new: true }
  )
}

const deleteCartProduct = async (userId: string, productId: string) => {
  await Cart.updateOne(
    { userId: userId },
    { $pull: { products: { _id: productId } } },
    { safe: true, multi: true }
  )
}

export {
  incrementProductQuantity,
  setProductQuantityDec,
  setProductQuantityInc,
  deleteCartProduct,
}
