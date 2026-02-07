import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import validateZodSchema from "../../middleware/validateZodSchemaRequest";
import { ReviewValidation } from "./review.validation";
import { ReviewController } from "./review.controller";

const router = Router();

//CREATE REVIEW ROUTE
router.post(
  "/",
  checkAuth(UserRole.USER),
  validateZodSchema(ReviewValidation.createReviewValidation),
  ReviewController.createReview
);

//UPDATE REVIEW STATUS ROUTE
router.patch(
  "/status/:id",
  checkAuth(UserRole.ADMIN),
  validateZodSchema(ReviewValidation.updateReviewStatusValidation),
  ReviewController.updateReviewStatus
);

//UPDATE REVIEW ROUTE
router.patch(
  "/:id",
  checkAuth(UserRole.USER),
  validateZodSchema(ReviewValidation.updateReviewValidation),
  ReviewController.updateReview
);
//GET ALL REVIEW BY BOOK ID ROUTE
router.get("/book/:bookId",
  ReviewController.getAllReviewsByBookId
);
//GET REVIEWS SPECIFIC BOOK AND USER ROUTE
router.get("/book/:bookId/user/:userId",
  ReviewController.getReviewByBookAndUser
);
//GET ALL REVIEWS ROUTE
router.get("/",
  checkAuth(UserRole.ADMIN),
  ReviewController.getAllReviews
);

//GET SINGLE REVIEW ROUTE
router.get("/:id", ReviewController.getReviewById);

// //DELETE REVIEW ROUTE
router.delete("/:id",
  checkAuth(UserRole.ADMIN, UserRole.USER),
  ReviewController.deleteReviewById
);

export const ReviewRouter = router;
