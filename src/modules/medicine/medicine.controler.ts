import { Request, Response } from "express"
import { medicineService } from "./medicine.service"

const postMedicine = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(400).json({
                error: "Unauthorized access ..!"
            })
        }
        const result = await medicineService.postMedicine(req.body, req.user.id as string);
        res.status(201).json({
            success: true,
            message: "Medicine inserted successfully..!",
            data: result,
            error: null
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Medicine inserted failed..!",
            data: null,
            error: error
        })
    }
};


const getAllMedicine = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;
        const result = await medicineService.getAllMedicine(
            typeof search === 'string'
                ? { search }
                : {} 
        );
        res.status(201).json({
            success: true,
            message: "Medicine retrive  successfully..!",
            data: result,
            error: null
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Medicine retrive failed..!",
            data: null,
            error: error
        })
    }
};


const getMedicineById = async (req: Request, res: Response) => {
    try {
        const { medicineId } = req.params;
        const result = await medicineService.getMedicineById(medicineId as string);
        res.status(201).json({
            success: true,
            message: "Medicine retrive  successfully..!",
            data: result,
            error: null
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Medicine retrive failed..!",
            data: null,
            error: error
        })
    }
};


const deleteMedicineById = async (req: Request, res: Response) => {
    try {
        const { medicineId } = req.params;
        const result = await medicineService.deleteMedicineById(medicineId as string);
        res.status(201).json({
            success: true,
            message: "Medicine deleted  successfully..!",
            data: result,
            error: null
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Medicine deleted failed..!",
            data: null,
            error: error
        })
    }
};




export const medicineController = {
    postMedicine,
    getAllMedicine,
    getMedicineById,
    deleteMedicineById
}