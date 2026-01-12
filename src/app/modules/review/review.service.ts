import httpStatus from "http-status";
import { IReview } from "./review.interface";
import { Review } from "./review.model";
import ApiError from "../../utils/ApiError";

//CREATE REVIEW CONTROLLER
const createReviewService = async (
  reviewInput: IReview
): Promise<IReview | null> => {
  // Check if the book exists
  const bookExists = await Review.findById(reviewInput.book);
  if (!bookExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book data does not found.");
  }
  //check user exists
  const userExists = await Review.findById(reviewInput.reviewer);
  if (!userExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User data does not found.");
  }
  //User And Book already exists
  const ReviewExists = await Review.findOne({
    book: reviewInput.book,
    reviewer: reviewInput.reviewer,
  });
  if (ReviewExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "You have already submitted a review for this book."
    );
  }
  // Create the review
  const review = await Review.create(reviewInput);
  return review;
};

export const ReviewService = {
  createReviewService,
};
