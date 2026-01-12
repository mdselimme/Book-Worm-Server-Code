import httpStatus from "http-status";
import { Request, Response } from "express";
import ApiResponse from "../../utils/ApiResponse";
import { ReviewService } from "./review.service";

//CREATE REVIEW CONTROLLER
const createReviewService = async (req: Request, res: Response) => {
  const result = await ReviewService.createReviewService(req.body);

  ApiResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Review data created successfully.",
    data: result,
  });
};

export const ReviewController = {
  createReviewService,
};
