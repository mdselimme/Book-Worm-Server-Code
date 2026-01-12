import z from "zod";
import { ReviewStatus } from "./review.interface";

//CREATE BOOK REVIEW VALIDATION
const createReviewValidation = z.object({
  book: z
    .string({
      message: "Invalid book ID format",
    })
    .length(24, { message: "Invalid book Object ID length." }),
  user: z
    .string({
      message: "Invalid user ID format",
    })
    .length(24, { message: "Invalid user Object ID length." }),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating cannot exceed 5" }),
  description: z
    .string({ error: "Description is required & string." })
    .min(10, { message: "Description must be at least 10 characters long" }),
});

//UPDATE BOOK REVIEW VALIDATION
const updateReviewValidation = z.object({
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating cannot exceed 5" })
    .optional(),
  description: z
    .string({ error: "Description is required & string." })
    .min(10, { message: "Description must be at least 10 characters long" })
    .optional(),
});

//UPDATE REVIEW STATUS VALIDATION
const updateReviewStatusValidation = z.object({
  status: z.enum(Object.values(
    ReviewStatus
  ), { message: "Status must be one of: PENDING, APPROVE, DECLINED" }
  ),
});

export const ReviewValidation = {
  createReviewValidation,
  updateReviewValidation,
  updateReviewStatusValidation,
};
