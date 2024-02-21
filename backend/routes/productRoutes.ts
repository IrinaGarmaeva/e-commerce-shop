import express, {Request, Response, Router} from "express";
import asyncHandler from "../middleware/asyncHandler";
import Product from "../models/productModel";
import { notFound, errorHandler } from "../middleware/errorMiddleware";

const router: Router = express.Router();

router.get("/", asyncHandler(async(req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  const products = await Product.find({})
  res.json(products)
}))

router.get("/:id", asyncHandler(async(req: Request, res: Response) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    return res.json(product)
  }
  res.status(404).json({message: "Resourse not found"})
}))

export default router
