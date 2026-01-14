import httpStatus from "http-status";
import { Request, Response } from "express";
import ApiResponse from "../../utils/ApiResponse";
import { ReviewService } from "./review.service";
import { IJwtTokenPayload } from "../../types/token.type";
import catchAsync from "../../utils/catchAsync";

//CREATE REVIEW CONTROLLER
const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.createReviewService(req.body);

  ApiResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Review data created successfully.",
    data: result,
  });
});

//UPDATE REVIEW CONTROLLER
const updateReview = catchAsync(async (req: Request, res: Response) => {
  const reviewId = req.params.id;
  const decodedToken = req.user;

  const result = await ReviewService.updateReviewService(
    reviewId as string,
    req.body,
    decodedToken as IJwtTokenPayload
  );

  ApiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review data updated successfully.",
    data: result,
  });
});

//GET REVIEW BY ID CONTROLLER
const getReviewById = catchAsync(async (req: Request, res: Response) => {
  const reviewId = req.params.id;

  const result = await ReviewService.getReviewByIdService(reviewId as string);
  ApiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review data retrieved successfully.",
    data: result,
  });
});

//UPDATE REVIEW STATUS CONTROLLER
const updateReviewStatus = catchAsync(async (req: Request, res: Response) => {
  const reviewId = req.params.id;
  const { status } = req.body;

  const result = await ReviewService.updateReviewStatusService(
    reviewId as string,
    status
  );

  ApiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review status updated successfully.",
    data: result,
  });
});

//DELETE REVIEW CONTROLLER
const deleteReviewById = catchAsync(async (req: Request, res: Response) => {
  const reviewId = req.params.id;
  const decodedToken = req.user;
  await ReviewService.deleteReviewByIdService(
    reviewId as string,
    decodedToken as IJwtTokenPayload
  );
  ApiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review data deleted successfully.",
    data: null,
  });
});

//get all reviews by book id controller
const getAllReviewsByBookId = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const result = await ReviewService.getAllReviewsByBookId(bookId as string);
  ApiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books Reviews retrieved successfully.",
    data: result,
  });
});

//get review by book and user controller
const getReviewByBookAndUser = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const userId = req.params.userId;
  const result = await ReviewService.getReviewByBookAndUser(bookId as string, userId as string);
  ApiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Book Review retrieved successfully.",
    data: result,
  });
});

//GET ALL REVIEWS CONTROLLER
const getAllReviews = catchAsync(async (req: Request, res: Response) => {

  const result = await ReviewService.getAllReviews();
  ApiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Reviews Retrieved Successfully.',
    data: result
  });
});


export const ReviewController = {
  createReview,
  updateReview,
  getReviewById,
  updateReviewStatus,
  deleteReviewById,
  getAllReviewsByBookId,
  getReviewByBookAndUser,
  getAllReviews
};