import { Medicine } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const postMedicine = async(data:Omit<Medicine, "id">) => {
    const result = await prisma.medicine.create({data});
    return result;
};

const getAllMedicine = async() => {
    const result = await prisma.medicine.findMany();
    return result;
};

const getMedicineById = async(id:string) => {
    const result = await prisma.medicine.findUnique({
        where: {
            id
        }
    });
    return result;
};


const deleteMedicineById = async(id:string) => {
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