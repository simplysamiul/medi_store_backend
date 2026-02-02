import express from "express";
import { medicineController } from "./medicine.controler";
import auth, { UserRole } from "../../middleware/auth.middleware";

const medicineRouter = express.Router();

// post a medicine 
medicineRouter.post("/", auth(UserRole.SELLER), medicineController.postMedicine);
medicineRouter.get("/", medicineController.getAllMedicine);
medicineRouter.get("/:medicineId", medicineController.getAllMedicine);
medicineRouter.delete("/:medicineId",auth(UserRole.SELLER, UserRole.ADMIN), medicineController.deleteMedicineById);

export default medicineRouter;