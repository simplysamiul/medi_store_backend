import express from "express";
import { medicineController } from "./medicine.controler";

const medicineRouter = express.Router();

// post a medicine 
medicineRouter.post("/", medicineController.postMedicine);
medicineRouter.get("/", medicineController.getAllMedicine);
medicineRouter.get("/:medicineId", medicineController.getAllMedicine);
medicineRouter.delete("/:medicineId", medicineController.deleteMedicineById);

export default medicineRouter;