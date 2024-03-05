import { Request, Response } from "express-serve-static-core";
import asyncHandler from "../middleware/asyncHandler";
import Product from "../models/productModel";

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  const product = await Product.findById(req.params.id);
  // console.log(req.params.id)
  if (product) {
    return res.json(product);
  }
  res.status(404).json({ message: "Resourse not found" });
});

export { getProducts, getProductById };
