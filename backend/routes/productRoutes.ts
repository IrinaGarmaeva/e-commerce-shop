import express, { Router} from "express";
import { getProducts, getProductById, createProduct } from "../controllers/productController";
import { protect, admin } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.get("/", getProducts);
router.post("/", protect, admin, createProduct);
router.get("/:id", getProductById);

export default router;
