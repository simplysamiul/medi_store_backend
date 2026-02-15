"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var medicine_controler_1 = require("./medicine.controler");
var auth_middleware_1 = require("../../middleware/auth.middleware");
var medicineRouter = express_1.default.Router();
// post a medicine 
medicineRouter.post("/", (0, auth_middleware_1.default)(auth_middleware_1.UserRole.SELLER), medicine_controler_1.medicineController.postMedicine);
medicineRouter.get("/", medicine_controler_1.medicineController.getAllMedicine);
medicineRouter.get("/:medicineId", medicine_controler_1.medicineController.getMedicineById);
medicineRouter.patch("/:medicineId", (0, auth_middleware_1.default)(auth_middleware_1.UserRole.SELLER), medicine_controler_1.medicineController.updateMedicineById);
medicineRouter.delete("/:medicineId", (0, auth_middleware_1.default)(auth_middleware_1.UserRole.SELLER), medicine_controler_1.medicineController.deleteMedicineById);
exports.default = medicineRouter;
