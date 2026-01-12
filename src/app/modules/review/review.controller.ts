import httpStatus from "http-status";
import { Request, Response } from "express";
import ApiResponse from "../../utils/ApiResponse";
import { ReviewService } from "./review.service";
import { IJwtTokenPayload } from "../../types/token.type";

//CREATE REVIEW CONTROLLER
const createReview = async (req: Request, res: Response) => {
  const result = await ReviewService.createReviewService(req.body);

  ApiResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Review data created successfully.",
    data: result,
  });
};

//UPDATE REVIEW CONTROLLER
const updateReview = async (req: Request, res: Response) => {
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
};

//GET REVIEW BY ID CONTROLLER
const getReviewById = async (req: Request, res: Response) => {
  const reviewId = req.params.id;

  const result = await ReviewService.getReviewByIdService(reviewId as string);
  ApiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review data retrieved successfully.",
    data: result,
  });
};

//UPDATE REVIEW STATUS CONTROLLER
const updateReviewStatus = async (req: Request, res: Response) => {
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
};

export const ReviewController = {
  createReview,
  updateReview,
  getReviewById,
  updateReviewStatus,
};
