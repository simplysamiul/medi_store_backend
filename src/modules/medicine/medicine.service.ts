import { Medicine } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const postMedicine = async (data: Omit<Medicine, "id" | "seller_id">, userId: string) => {
    const result = await prisma.medicine.create({
        data: {
            ...data,
            seller_id: userId,
        }

    });
    return result;
};

const getAllMedicine = async (payload: { search?: string | undefined }) => {
    const result = await prisma.medicine.findMany({
        where: {
            OR: [
                {
                    med_name: {
                        contains: payload.search as string,
                        mode: 'insensitive'
                    }
                },
                {
                    manufacturer: {
                        contains: payload.search as string,
                        mode: 'insensitive'
                    }
                }
            ]
        }
    });
    return result;
};

const getMedicineById = async (id: string) => {
    const result = await prisma.medicine.findUnique({
        where: {
            id
        }
    });
    return result;
};


const deleteMedicineById = async (id: string) => {
    const result = await prisma.medicine.delete({
        where: {
            id
        }
    });
    return result;
};






export const medicineService = {
    postMedicine,
    getAllMedicine,
    getMedicineById,
    deleteMedicineById
}