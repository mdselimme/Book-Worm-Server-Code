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

// //GET ALL BOOKS ROUTE
// router.get("/",
//     BookController.getAllBooks
// );

//GET SINGLE BOOK ROUTE
router.get("/:id", ReviewController.getReviewById);

// //DELETE BOOK ROUTE
// router.delete("/:id",
//     checkAuth(UserRole.ADMIN),
//     BookController.deleteBookById
// );

export const BookRouter = router;
