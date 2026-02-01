import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.createReview(req.body);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result,
      error: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Review creation failed",
      data: null,
      error: error.message,
    });
  }
};

const getAllReviews = async (_req: Request, res: Response) => {
  try {
    const result = await ReviewService.getAllReviews();

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: result,
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      data: null,
      error: error.message,
    });
  }
};

const getReviewById = async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.getReviewById(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: result,
      error: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Review not found",
      data: null,
      error: error.message,
    });
  }
};

const deleteReviewById = async (req: Request, res: Response) => {
  try {
    await ReviewService.deleteReviewById(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: null,
      error: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Review deletion failed",
      data: null,
      error: error.message,
    });
  }
};

export const ReviewController = {
  createReview,
  getAllReviews,
  getReviewById,
  deleteReviewById,
};
