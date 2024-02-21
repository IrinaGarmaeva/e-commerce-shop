import express, { Router} from "express";
import { getProducts, getProductById } from "../controllers/productController";

const router: Router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get("/", getProducts)

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
router.get("/:id", getProductById)

export default router
