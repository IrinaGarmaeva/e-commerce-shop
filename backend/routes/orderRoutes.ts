import express, { Router } from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToConfirm,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController";
import { protect, admin } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/", protect, admin, getOrders);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/confirm", protect, updateOrderToConfirm);
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

export default router;
