import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import validateZodSchema from "../../middleware/validateZodSchemaRequest";
import { TutorialValidation } from "./tutorial.validation";
import { TutorialController } from "./tutorial.controller";

const router = Router();

//CREATE TUTORIAL ROUTE
router.post("/",
    checkAuth(UserRole.ADMIN),
    validateZodSchema(TutorialValidation.createTutorialZodSchema),
    TutorialController.createTutorial
);

//UPDATE TUTORIAL ROUTE
router.patch("/:id",
    checkAuth(UserRole.ADMIN),
    validateZodSchema(TutorialValidation.updateTutorialZodSchema),
    TutorialController.updateTutorial
);

export const TutorialRouter = router;