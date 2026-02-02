import { Router } from "express";
import { CategoryController } from "./category.controller";
import auth, { UserRole } from "../../middleware/auth.middleware";

export const CategoryRouter = Router();

CategoryRouter.post("/",auth(UserRole.ADMIN) ,CategoryController.createCategory);
CategoryRouter.get("/", CategoryController.getAllCategories);
CategoryRouter.get("/:id", CategoryController.getCategoryById);
CategoryRouter.patch("/:id", auth(UserRole.ADMIN), CategoryController.updateCategory);
CategoryRouter.delete("/:id",auth(UserRole.ADMIN), CategoryController.deleteCategory);