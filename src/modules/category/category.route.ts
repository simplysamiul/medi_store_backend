import { Router } from "express";
import { CategoryController } from "./category.controller";

export const CategoryRouter = Router();

CategoryRouter.post("/", CategoryController.createCategory);
CategoryRouter.get("/", CategoryController.getAllCategories);
CategoryRouter.get("/:id", CategoryController.getCategoryById);
CategoryRouter.patch("/:id", CategoryController.updateCategory);
CategoryRouter.delete("/:id", CategoryController.deleteCategory);