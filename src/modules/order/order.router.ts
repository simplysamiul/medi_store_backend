import express from "express";
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middleware/auth.middleware";

export const orderRouter = express.Router();

orderRouter.post("/", orderController.createOrder);
orderRouter.get("/", auth(UserRole.ADMIN), orderController.getAllOrder);
orderRouter.get("/:customerId", orderController.getOrderById);
orderRouter.patch("/:id", auth(UserRole.ADMIN), orderController.UpdateOrder);
 
