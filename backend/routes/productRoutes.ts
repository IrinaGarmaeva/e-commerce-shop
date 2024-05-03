import express, { Router} from "express";
import { getProducts, getProductsByCategory, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController";
import { protect, admin } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);
router.post("/", protect, admin, createProduct);
router.get("/:id", getProductById);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
