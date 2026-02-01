import { Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createReview = async (data:Omit<Review, "id" | "created_at"> ) => {
  return prisma.review.create({
    data,
  });
};

const getAllReviews = async () => {
  return prisma.review.findMany({
    orderBy: { created_at: "desc" },
  });
};

const getReviewById = async (id: string) => {
  return prisma.review.findUnique({
    where: { id },
  });
};

const deleteReviewById = async (id: string) => {
  return prisma.review.delete({
    where: { id },
  });
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getReviewById,
  deleteReviewById,
};
