import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Products", productSchema);
