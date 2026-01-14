import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import ApiResponse from "../../utils/ApiResponse";
import { readingService } from "./reading.service";


//REGISTER USER CONTROLLER
const wantToReadBook = catchAsync(async (req: Request, res: Response) => {
    const bookData = req.body;

    const result = await readingService.wantToReadBookService(bookData);
    ApiResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Book added to Want to Read successfully.',
        data: result,
    });
});

//UPDATE BOOK PROGRESS CONTROLLER
const updateReadingProgress = catchAsync(async (req: Request, res: Response) => {

    const readingId = req.params.id;
    const { progress } = req.body;
    const result = await readingService.updateReadingProgressService(readingId as string, progress);

    ApiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book progress updated successfully.',
        data: result,
    });
});

export const ReadingController = {
    wantToReadBook,
    updateReadingProgress
};