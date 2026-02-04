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

const getAllMedicine = async (payload: { search?: string }) => {
    const search = payload.search?.trim();

    const result = await prisma.medicine.findMany({
        ...(search && {
            where: {
                OR: [
                    {
                        med_name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        manufacturer: {
                            contains: search,
                            mode: "insensitive"
                        },
                    },
                ],
            },
        }),
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


const updateMedicineById =  async(id:string, data:Partial<Medicine>)=>{
    return prisma.medicine.update({
        where: {
            id
        },
        data
    })
}


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
    updateMedicineById,
    deleteMedicineById
}