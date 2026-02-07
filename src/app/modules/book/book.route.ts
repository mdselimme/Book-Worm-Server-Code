import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import validateZodSchema from "../../middleware/validateZodSchemaRequest";
import { BookValidation } from "./book.validation";
import { multerUpload } from "../../config/multer.config";
import { BookController } from "./book.controller";


const router = Router();

//CREATE BOOK ROUTE
router.post("/",
    checkAuth(UserRole.ADMIN),
    multerUpload.single("file"),
    validateZodSchema(BookValidation.createBookValidation),
    BookController.createBook
);

//UPDATE BOOK ROUTE
router.patch("/:id",
    checkAuth(UserRole.ADMIN),
    multerUpload.single("file"),
    validateZodSchema(BookValidation.updateBookValidation),
    BookController.updateBook
);

//GET ALL BOOKS ROUTE
router.get("/",
    BookController.getAllBooks
);

//GET SINGLE BOOK ROUTE
router.get("/:id",
    BookController.getBookById
);

//DELETE BOOK ROUTE
router.delete("/:id",
    checkAuth(UserRole.ADMIN),
    BookController.deleteBookById
);


export const BookRouter = router;