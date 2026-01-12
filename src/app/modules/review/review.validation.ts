import z from "zod";

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

export const ReviewValidation = {
  createReviewValidation,
  updateReviewValidation,
};
