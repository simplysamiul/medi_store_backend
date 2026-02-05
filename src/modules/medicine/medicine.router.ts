import express from "express";
import { medicineController } from "./medicine.controler";
import auth, { UserRole } from "../../middleware/auth.middleware";

const medicineRouter = express.Router();

// post a medicine 
medicineRouter.post("/", auth(UserRole.SELLER), medicineController.postMedicine);
medicineRouter.get("/", medicineController.getAllMedicine);
medicineRouter.get("/:medicineId", medicineController.getMedicineById);
medicineRouter.patch("/:medicineId",auth(UserRole.SELLER), medicineController.updateMedicineById);
medicineRouter.delete("/:medicineId",auth(UserRole.SELLER), medicineController.deleteMedicineById);

export default medicineRouter;