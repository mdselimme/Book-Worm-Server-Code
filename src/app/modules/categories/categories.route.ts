import { Router } from "express";
import { CategoriesController } from "./categories.controller";
import { checkAuth } from "../../middleware/checkAuth";
import validateZodSchema from "../../middleware/validateZodSchemaRequest";
import { UserRole } from "../user/user.interface";
import { CategoryValidation } from "./categories.validation";

const router = Router();

//CREATE CATEGORY ROUTE
router.post('/',
    checkAuth(UserRole.ADMIN),
    validateZodSchema(CategoryValidation.createCategoryValidation),
    CategoriesController.createNewCategoryController);

//UPDATE CATEGORY ROUTE
router.patch('/:id',
    checkAuth(UserRole.ADMIN),
    validateZodSchema(CategoryValidation.updateCategoryValidation),
    CategoriesController.updateCategoryController
);

//GET ALL CATEGORIES ROUTE
router.get('/',
    CategoriesController.getAllCategoriesController
);

//DELETE CATEGORY ROUTE
router.delete('/:id',
    checkAuth(UserRole.ADMIN),
    CategoriesController.deleteCategoryController);

export const CategoriesRouter = router;