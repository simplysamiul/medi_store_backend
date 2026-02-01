import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.createCategory(req.body);
    console.log(result)
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
      error: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to create category",
      data: null,
      error: error.message,
    });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.getAllCategories();

    res.status(200).json({
      success: true,
      message: "Categories retrive successfully",
      data: result,
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrive categories",
      data: null,
      error: error.message,
    });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.getCategoryById(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Category retrive successfully",
      data: result,
      error: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Category not found",
      data: null,
      error: error.message,
    });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.updateCategory(
      req.params.id as string,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
      error: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to update category",
      data: null,
      error: error.message,
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    await CategoryService.deleteCategory(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: null,
      error: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to delete category",
      data: null,
      error: error.message,
    });
  }
};

export const CategoryController = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
