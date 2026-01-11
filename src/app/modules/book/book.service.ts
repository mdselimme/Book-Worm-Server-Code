import httpStatus from 'http-status';
import ApiError from "../../utils/ApiError";
import { IBook } from "./book.interface";
import { Book } from "./book.model";
import { deleteImageFromCloudinary } from '../../config/cloudinary.config';


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
        throw new ApiError(httpStatus.NOT_FOUND, 'Book data not found.');
    }
    //check book exist by title
    if (bookInput.title) {
        const bookExistsByTitle = await Book.findOne({ title: bookInput.title });
        if (bookExistsByTitle) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Another book already exists with this title.');
        }
    };
    //delete old cover image from cloudinary if new image is provided
    if(bookInput.coverImage){
        await deleteImageFromCloudinary(bookExists.coverImage);
    }
    //update book
    const result = await Book.findByIdAndUpdate(bookId, bookInput, {
        new: true,
        runValidators: true
    });
    return result;
};


export const BookService = {
    createBook,
    updateBook,
}