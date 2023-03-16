import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
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
        title: { type: String, required: true },
      },
    ],
    amount: { type: Number, required: true },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
    },

    payment: { type: String },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
)

export default mongoose.model('Order', OrderSchema)
