import express from "express";
import Product from "../models/product.model.js";
import Inventory from "../models/inventory.model.js";
import { authentication } from "./auth.routes.js";
const router = express.Router();

router.post("/addProduct", authentication, async (req, res) => {
  try {
    const { productName, casNumber, unit } = req.body;

    if (!productName || !casNumber || !unit) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.create({
      productName,
      casNumber,
      unit,
    });

    await Inventory.create({
      product: product._id,
      stockQuantity: 0,
    });

    return res.status(201).json({
      message: "Product added to inventory",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Product with this CAS number already exists",
      });
    }

    return res.status(500).json({ message: error.message });
  }
});


export default router;
