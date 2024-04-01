import express, { Router} from "express";
import { getProducts, getProductById, createProduct, updateProduct } from "../controllers/productController";
import { protect, admin } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.get("/", getProducts);
router.post("/", protect, admin, createProduct);
router.get("/:id", getProductById);
router.put("/:id", protect, admin, updateProduct);

export default router;
