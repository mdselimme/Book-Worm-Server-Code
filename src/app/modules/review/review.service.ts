import httpStatus from "http-status";
import { IReview, ReviewStatus } from "./review.interface";
import { Review } from "./review.model";
import ApiError from "../../utils/ApiError";
import { IJwtTokenPayload } from "../../types/token.type";
import { UserRole } from "../user/user.interface";
import { Book } from "../book/book.model";
import { User } from "../user/user.model";

//CREATE REVIEW CONTROLLER
const createReviewService = async (
  reviewInput: IReview
): Promise<IReview | null> => {
  // Check if the book exists
  const bookExists = await Book.findById(reviewInput.book);
  if (!bookExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book data does not found.");
  }
  //check user exists
  const userExists = await User.findById(reviewInput.reviewer);
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

//UPDATE REVIEW CONTROLLER
const updateReviewService = async (
  reviewId: string,
  reviewInput: IReview,
  decodedToken: IJwtTokenPayload
): Promise<IReview | null> => {
  // Check if the review exists
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review data does not found.");
  }
  // Check if the user is authorized to update the review
  if (review.reviewer.toString() !== decodedToken.id) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to update this review."
    );
  }
  // Update the review
  const updatedReview = await Review.findByIdAndUpdate(reviewId, reviewInput, {
    new: true,
    runValidators: true,
  });
  return updatedReview;
};

//GET REVIEW BY ID SERVICE
const getReviewByIdService = async (
  reviewId: string
): Promise<IReview | null> => {
  // Check if the review exists
  const review = await Review.findById(reviewId).populate("reviewer", "name");
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review data does not found.");
  }
  return review;
};

//UPDATE REVIEW STATUS SERVICE
const updateReviewStatusService = async (
  reviewId: string,
  status: ReviewStatus
): Promise<IReview | null> => {
  // Check if the review exists
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review data does not found.");
  }
  // Update the review status
  review.status = status as ReviewStatus;
  await review.save();
  return review;
};

//DELETE REVIEW SERVICE
const deleteReviewByIdService = async (
  reviewId: string,
  decodedToken: IJwtTokenPayload
): Promise<void> => {
  // Check if the review exists
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review data does not found.");
  }
  // Check if the user is authorized to delete the review
  if (UserRole.ADMIN !== decodedToken.role) {
    if (review.reviewer.toString() !== decodedToken.id) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized to delete this review."
      );
    }
  };
  await Review.findByIdAndDelete(reviewId);
};

//GET ALL REVIEWS BY BOOK ID SERVICE
const getAllReviewsByBookId = async (
  bookId: string
): Promise<IReview[]> => {
  const reviews = await Review.find(
    { book: bookId, status: ReviewStatus.APPROVE }
  )
    .populate("reviewer", "name");
  return reviews;
}

//GET REVIEW BY BOOK AND USER SERVICE
const getReviewByBookAndUser = async (
  bookId: string,
  userId: string
): Promise<IReview | null> => {
  const review = await Review.findOne(
    { book: bookId, reviewer: userId }
  )
    .populate("reviewer", "name");
  return review;
}

//GET ALL REVIEWS SERVICE
const getAllReviews = async (): Promise<IReview[]> => {
  const reviews = await Review.find()
    .populate("reviewer", "name")
    .populate("book", "title");
  return reviews;
};

//EXPORTING ALL SERVICES
export const ReviewService = {
  createReviewService,
  updateReviewService,
  getReviewByIdService,
  updateReviewStatusService,
  deleteReviewByIdService,
  getAllReviewsByBookId,
  getReviewByBookAndUser,
  getAllReviews
};
