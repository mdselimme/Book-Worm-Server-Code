import httpStatus from 'http-status';
import { Request, Response } from "express";
import ApiResponse from "../../utils/ApiResponse";
import { BookService } from './book.service';



//CREATE Book CONTROLLER
const createBook = async (req: Request, res: Response) => {

    const bookData = req.body;
    bookData.coverImage = req.file?.path;

    const result = await BookService.createBook(bookData);

    ApiResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Book Added Successfully.',
        data: result
    });
};


//UPDATE Book CONTROLLER
const updateBook = async (req: Request, res: Response) => {

    const bookId = req.params.id;

    const bookData = req.body;
    bookData.coverImage = req.file?.path;

    const result = await BookService.updateBook(bookId as string, bookData);

    ApiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book Updated Successfully.',
        data: result
    });
};



export const BookController = {
    createBook,
    updateBook,
};