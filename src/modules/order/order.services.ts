import { Order, OrderStatus, Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"

const createOrder = async (data: Prisma.OrderCreateInput) => {
    const result = await prisma.order.create({
        data
    });
    return result;
};

const getAllOrder = async () => {
    const result = await prisma.order.findMany();
    return result;
};

const getOrderById = async (customerId: string) => {
    
    const result = await prisma.order.findMany({
        where: {
            customer_id: customerId
        }
    });
    return result;
};

const updateOrder = async (orderId: string, status: OrderStatus) => {
    console.log(orderId, status?.status)
    const result = await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            status: status.status as OrderStatus
        }
    });
    return result;
};


export const orderService = {
    createOrder,
    getAllOrder,
    updateOrder,
    getOrderById
};