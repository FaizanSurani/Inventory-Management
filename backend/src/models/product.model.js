import mongoose, { model } from "mongoose";

const productSchema  = new mongoose.Schema(
    {
        productName: {
            type: String, 
            required: true,
        },
        casNumber: {
            type: String,
            unique: true,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        }
    }
)

const Product = mongoose.model("Product", productSchema);
export default Product;