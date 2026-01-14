import httpStatus from 'http-status';
import { Request, Response } from "express";
import ApiResponse from "../../utils/ApiResponse";
import { BookService } from './book.service';
import catchAsync from '../../utils/catchAsync';



//CREATE Book CONTROLLER
const createBook = catchAsync(async (req: Request, res: Response) => {

    const bookData = req.body;
    bookData.coverImage = req.file?.path;

    const result = await BookService.createBook(bookData);

    ApiResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Book Added Successfully.',
        data: result
    });
});


//UPDATE Book CONTROLLER
const updateBook = catchAsync(async (req: Request, res: Response) => {
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
});

//GET ALL BOOKS CONTROLLER
const getAllBooks = catchAsync(async (req: Request, res: Response) => {

    const query = req.query;

    const result = await BookService.getAllBooks(query);

    ApiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Books retrieved successfully.',
        data: result
    });
});

//GET ALL BOOKS CONTROLLER
const getBookById = catchAsync(async (req: Request, res: Response) => {

    const bookId = req.params.id;

    const result = await BookService.getBookById(bookId as string);

    ApiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Find Book retrieved successfully.',
        data: result
    });
});

//DELETE BOOK CONTROLLER
const deleteBookById = catchAsync(async (req: Request, res: Response) => {

    const bookId = req.params.id;

    const result = await BookService.deleteBookById(bookId as string);

    ApiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book data deleted permanently successfully.',
        data: result
    });
});


export const BookController = {
    createBook,
    updateBook,
    getAllBooks,
    getBookById,
    deleteBookById,
};