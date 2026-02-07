import { Router } from "express";
import validateZodSchema from "../../middleware/validateZodSchemaRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import { authLimiter } from "../../middleware/rateLimiter";

const router = Router();

// AUTH LOGIN ROUTE 
router.post('/login',
    authLimiter,
    validateZodSchema(AuthValidation.loginValidation),
    AuthController.logInUser
);
//AUTH CHANGE PASSWORD ROUTE
router.patch('/change-password',
    checkAuth(...Object.values(UserRole)),
    validateZodSchema(AuthValidation.changePasswordValidation),
    AuthController.changePassword
);
//AUTH REFRESH TOKEN ROUTE
router.post('/refresh-token',
    AuthController.undoRefreshToken
);
// AUTH LOGOUT ROUTE
router.post('/logout',
    checkAuth(...Object.values(UserRole)),
    AuthController.logOutUser
);

export const AuthRouter = router;