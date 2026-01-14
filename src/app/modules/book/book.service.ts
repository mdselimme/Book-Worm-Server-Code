/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from "../../utils/ApiError";
import { IBook } from "./book.interface";
import { Book } from "./book.model";
import { deleteImageFromCloudinary } from '../../config/cloudinary.config';
import { queryBuilder } from '../../utils/queryBuilder';


//CREATE Book CONTROLLER
const createBook = async (bookInput: IBook) => {
    //validate cover image
    if (!bookInput.coverImage) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Cover image is required.');
    }
    //book exist by title
    const bookExists = await Book.findOne({ title: bookInput.title });
    if (bookExists) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Book already exists with this title.');
    }
    //create book
    const result = await Book.create(bookInput);
    return result;
};

//UPDATE BOOK SERVICE
const updateBook = async (bookId: string, bookInput: Partial<IBook>) => {
    //check book exist by id
    const bookExists = await Book.findById(bookId);
    if (!bookExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book data not found. Invalid Book ID.');
    }
    //delete old cover image from cloudinary if new image is provided
    if (bookInput.coverImage) {
        await deleteImageFromCloudinary(bookExists.coverImage);
    }
    //update book
    const result = await Book.findByIdAndUpdate(bookId, bookInput, {
        new: true,
        runValidators: true
    });
    return result;
};

//GET ALL BOOKS SERVICE
const getAllBooks = async (query: any) => {

    const { search, limit, page } = query;

    const books = await queryBuilder({
        model: Book,
        searchFields: ['title', 'author'],
        query: {
            search: search,
            limit: limit,
            page: page,
        },
        populate: [
            {
                path: 'categories',
                select: 'title'
            }
        ]
    });
    return books;
};

//GET SINGLE BOOK SERVICE
const getBookById = async (id: string) => {
    const book = await Book.findById(id)
        .populate({
            path: 'categories',
            select: 'title'
        });
    if (!book) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book data not found. Invalid Book ID.');
    }
    return book;
};

//DELETE BOOK SERVICE
const deleteBookById = async (id: string): Promise<IBook | null> => {
    // Check if book exists
    const book = await Book.findById(id);
    // If not found, throw not found error
    if (!book) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book data not found. Invalid Book ID.');
    }
    // If found, delete cover image from cloudinary
    if (book.coverImage) {
        await deleteImageFromCloudinary(book.coverImage);
    }
    // Then delete book
    await Book.findByIdAndDelete(id);
    return null;
};

export const BookService = {
    createBook,
    updateBook,
    getAllBooks,
    getBookById,
    deleteBookById,
}