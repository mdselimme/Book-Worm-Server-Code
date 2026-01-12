import httpStatus from 'http-status';
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import ApiResponse from "../../utils/ApiResponse";
import { TutorialService } from './tutorial.service';



//CREATE TUTORIAL CONTROLLER
const createTutorial = catchAsync(async (req: Request, res: Response) => {

    const result = await TutorialService.createTutorial(req.body);

    ApiResponse(res, {
        success: true,
        message: "Tutorial data created successfully",
        statusCode: httpStatus.CREATED,
        data: result
    })
});

//UPDATE TUTORIAL CONTROLLER
const updateTutorial = catchAsync(async (req: Request, res: Response) => {

    const result = await TutorialService.updateTutorial(req.params.id as string, req.body);

    ApiResponse(res, {
        success: true,
        message: "Tutorial data updated successfully.",
        statusCode: httpStatus.OK,
        data: result
    });
});

//GET TUTORIAL BY ID CONTROLLER
const getTutorialById = catchAsync(async (req: Request, res: Response) => {
    const result = await TutorialService.getTutorialById(req.params.id as string);
    ApiResponse(res, {
        success: true,
        message: "Tutorial data fetched successfully.",
        statusCode: httpStatus.OK,
        data: result
    });
});

//DELETE TUTORIAL CONTROLLER
const deleteTutorial = catchAsync(async (req: Request, res: Response) => {
    await TutorialService.deleteTutorial(req.params.id as string);
    ApiResponse(res, {
        success: true,
        message: "Tutorial data deleted successfully.",
        statusCode: httpStatus.OK,
        data: null
    });
});

export const TutorialController = {
    createTutorial,
    updateTutorial,
    getTutorialById,
    deleteTutorial,
};