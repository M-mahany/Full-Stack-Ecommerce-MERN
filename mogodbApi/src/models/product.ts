import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    sku: { type: String, unique: true, required: true },
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    category:{type: String, required: true},
    soldBy:{type:String, required:true},
  },
  { timestamps: true }
)

export default mongoose.model('Product', ProductSchema)
