import { Router } from "express";
import { ReviewController } from "./review.controller";

export const ReviewRoutes = Router();

ReviewRoutes.post("/", ReviewController.createReview);
ReviewRoutes.get("/", ReviewController.getAllReviews);
ReviewRoutes.get("/:id", ReviewController.getReviewById);
ReviewRoutes.delete("/:id", ReviewController.deleteReviewById);
