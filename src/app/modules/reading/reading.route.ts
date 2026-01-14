import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import validateZodSchema from "../../middleware/validateZodSchemaRequest";
import { readingValidation } from "./reading.validation";
import { ReadingController } from "./reading.controller";


const router = Router();

//ADD TO READ BOOK
router.post('/want-to-read',
    checkAuth(UserRole.USER),
    validateZodSchema(readingValidation.wantToReadBookSchema),
    ReadingController.wantToReadBook
);
//UPDATE READING PROGRESS
router.patch('/update-progress/:id',
    checkAuth(UserRole.USER),
    validateZodSchema(readingValidation.updateReadingProgressSchema),
    ReadingController.updateReadingProgress
);

export const ReadingRouter = router;