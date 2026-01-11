import ApiResponse from "../../utils/ApiResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import { UserService } from "./user.service";

//REGISTER USER CONTROLLER
const registerUser = catchAsync(async (req: Request, res: Response) => {
    const userData = req.body;
    //set profile photo path
    userData.profilePhoto = req.file?.path;
    const result = await UserService.registerUserService(userData);
    ApiResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User Account registered successfully',
        data: result,
    });
});

export const UserController = {
    registerUser,
}