import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createCategory = async (data: Omit<Category, "id" | "created_at" | "updated_at ">) => {
    return prisma.category.create({
        data,
    });
};

const getAllCategories = async () => {
    return prisma.category.findMany({
        orderBy: { created_at: "desc" },
    });
};

const getCategoryById = async (id: string) => {
    return prisma.category.findUnique({
        where: { id },
    });
};

const updateCategory = async (
    id: string,
    payload: { name?: string }
) => {
    return prisma.category.update({
        where: { id },
        data: payload,
    });
};

const deleteCategory = async (id: string) => {
    return prisma.category.delete({
        where: { id },
    });
};

export const CategoryService = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
