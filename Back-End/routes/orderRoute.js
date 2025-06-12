import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, createOrder);
orderRouter.get("/getUserOrders", authMiddleware, getUserOrders);

export default orderRouter;
