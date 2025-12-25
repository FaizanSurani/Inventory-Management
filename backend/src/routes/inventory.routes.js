import express from "express";
import Inventory from "../models/inventory.model.js";
import Product from "../models/product.model.js";
import { authentication } from "./auth.routes.js";
const router = express.Router();

router.get("/inventory", async (req, res) => {
  try {
    const inventory = await Inventory.find().populate("product");

    return res.status(200).json(inventory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.patch("/stockQty/:id", authentication, async (req, res) => {
  try {
    const { id } = req.params;
    const { stockQty, action } = req.body;

    if (!id || typeof stockQty != "number" || stockQty <= 0) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const update =
      action === "Increase"
        ? { $inc: { stockQuantity: stockQty } }
        : { $inc: { stockQuantity: -stockQty } };

    const query =
      action === "Decrease"
        ? { product: id, stockQuantity: { $gte: stockQty } }
        : { product: id };

    const updated = await Inventory.findOneAndUpdate(query, update, {
      new: true,
    }).populate("product");

    if (!updated) {
      return res.status(400).json({
        message:
          action === "Decrease" ? "Insufficient stock" : "Product not found",
      });
    }

    return res.status(200).json({
      message: `Stock ${action.toLowerCase()}d`,
      inventory: updated,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/removeProduct/:id", authentication, async (req, res) => {
  try {
    const { id } = req.params;

    const productValue = await Product.findById(id);

    if (!productValue) {
      return res
        .status(404)
        .json({ message: "No Such Product is present in the inventory" });
    }

    await Inventory.findOneAndDelete({ product: id });
    await Product.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Product removed from inventory successfully",
    });
  } catch (error) {
     return res.status(500).json({ message: error.message });
  }
});

export default router;
