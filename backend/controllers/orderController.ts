import { Request, Response } from "express-serve-static-core";
import asyncHandler from "../middleware/asyncHandler";
import Order, { IOrderItem } from "../models/orderModel";

interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
  };
}

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((item: IOrderItem) => ({
        ...item,
        product: item,
        _id: undefined,
      })),
      user,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

// @desc    Get logges in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  const id = (req as AuthenticatedRequest).user._id;
  const orders = await Order.find({ user: id });
  res.status(200).json(orders);
});

// @desc    Get orfer by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);

  if(order) {
    order.isPaid = true;
    order.isConfirmed = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    }

    const updateOrder = await order.save();
    res.status(200).json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to confirm
// @route   PUT /api/orders/:id/confirm
// @access  Private
const updateOrderToConfirm = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);

  if(order) {
    order.isConfirmed = true;
    const updateOrder = await order.save();
    res.status(200).json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to pay with gift certificate
// @route   PUT /api/orders/:id/paybycertificate
// @access  Private
const updateOrderToPayWithCertificate = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);

  if(order) {
    order.isConfirmed = true;
    order.certificateNumber = req.body.certificateNumber;
    const updateOrder = await order.save();
    res.status(200).json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/admin
const updateOrderToDelivered = asyncHandler(
  async (req: Request, res: Response) => {
    res.json("Update order to delivered");
  }
);

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req: Request, res: Response) => {
  res.json("get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToConfirm,
  updateOrderToPayWithCertificate,
  updateOrderToDelivered,
  getOrders,
};
