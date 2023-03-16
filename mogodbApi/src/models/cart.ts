import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
        img: { type: String, required: true },
        title: { type: String, required: true, },
      },
    ],
  },

  { timestamps: true }
)

export default mongoose.model('Cart', CartSchema)
