import { Request, Response } from "express"
import { orderService } from "./order.services";
import { Prisma } from "../../../generated/prisma/client";

const createOrder = async (req: Request, res: Response) => {
    try {
        const order = req.body;
        const confirmOrder = {
            customer_id: order.customer_id,
            total_amount: order.total_amount?.toString(),
            shipping_address: order.shipping_address as Prisma.InputJsonValue,
            orderItems:order.orderItems as Prisma.InputJsonValue
        }
        const result = await orderService.createOrder(confirmOrder);
        res.status(201).json({
            success: true,
            message: "Order created successfully..!",
            data: result,
            error: null
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Order created failed..!",
            data: null,
            error: error
        })
    }
};


const getAllOrder = async (req: Request, res: Response) => {
    try {
        const result = await orderService.getAllOrder();
        res.status(201).json({
            success: true,
            message: "Order retrive successfully..!",
            data: result,
            error: null
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Order retrive failed..!",
            data: null,
            error: error
        })
    }
};

const UpdateOrder = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const status = req.body;
        const result = await orderService.updateOrder(orderId as string, status);
        res.status(201).json({
            success: true,
            message: "Order update successfully..!",
            data: result,
            error: null
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Order update failed..!",
            data: null,
            error: error
        })
    }
};




export const orderController = {
    createOrder,
    getAllOrder,
    UpdateOrder
}