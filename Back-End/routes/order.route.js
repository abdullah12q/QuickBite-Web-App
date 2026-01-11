import express from "express";
import {
  createOrder,
  getOrders,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, createOrder);
orderRouter.put("/status", updateOrderStatus);
orderRouter.get("/getUserOrders", authMiddleware, getUserOrders);
orderRouter.get("/getAllOrders", getOrders);

export default orderRouter;
