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
    })
});

export const TutorialController = {
    createTutorial,
    updateTutorial,
};