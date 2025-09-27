// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  destacado: {
    type: Boolean,
    default: false, // por defecto no es destacado
  }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
