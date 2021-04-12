import mongoose from "mongoose"

const productSchema = mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "User",
  // },

  title: String,
  description: String,
  creator: String,
  price: Number,
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const Product = mongoose.model("Product", productSchema)

export default Product
