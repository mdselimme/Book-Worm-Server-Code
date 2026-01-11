import { Router } from "express";
import validateZodSchema from "../../middleware/validateZodSchemaRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import { multerUpload } from "../../config/multer.config";



const router = Router();

// USER CREATE ROUTE 
router.post('/register',
    multerUpload.single("file"),
    validateZodSchema(UserValidation.userCreateValidation),
    UserController.registerUser
);


export const UserRouter = router;