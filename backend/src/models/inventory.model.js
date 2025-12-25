import mongoose, { Types } from "mongoose";

const inventorySchema = new mongoose.Schema({
  product: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  stockQuantity: {
    type: Number,
    default: 0,
    min: 0
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
