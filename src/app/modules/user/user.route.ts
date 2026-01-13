import { Router } from "express";
import validateZodSchema from "../../middleware/validateZodSchemaRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import { multerUpload } from "../../config/multer.config";
import { UserRole } from "./user.interface";
import { checkAuth } from "../../middleware/checkAuth";



const router = Router();

// USER CREATE ROUTE 
router.post('/register',
    multerUpload.single("file"),
    validateZodSchema(UserValidation.userCreateValidation),
    UserController.registerUser
);
//GET ME USER ROUTE
router.get('/me',
    checkAuth(...Object.values(UserRole)),
    UserController.getCurrentUser
);
// USER UPDATE ROUTE
router.patch('/',
    checkAuth(...Object.values(UserRole)),
    multerUpload.single("file"),
    validateZodSchema(UserValidation.userUpdateValidation),
    UserController.updateUser
);
// USER ROLE UPDATE ROUTE
router.patch('/update-role',
    checkAuth(UserRole.ADMIN),
    validateZodSchema(UserValidation.userRoleUpdateValidation),
    UserController.updateUserRole
);

//GET ALL USERS ROUTE
router.get('/',
    checkAuth(UserRole.ADMIN),
    UserController.getAllUsers
);


export const UserRouter = router;