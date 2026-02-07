import httpStatus from 'http-status';
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import ApiResponse from "../../utils/ApiResponse";
import { AuthService } from './auth.service';
import { setTokenAuthCookie } from '../../utils/setTokenCookie';

//Auth Login Controller
const logInUser = catchAsync(async (req: Request, res: Response) => {

    const result = await AuthService.logInUser(req.body);

    //Set Token In cookie
    setTokenAuthCookie(res, {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
    });

    ApiResponse(res, {
        success: true,
        message: 'User Logged In Successfully.',
        statusCode: httpStatus.OK,
        data: result
    });
});

// CHANGE PASSWORD CONTROLLER 
const changePassword = catchAsync(async (req: Request, res: Response) => {
    //get old and new password from request body
    const { oldPassword, newPassword } = req.body;
    //get user id from decoded token
    const decodedToken = req.user;

    const result = await AuthService.changePassword(decodedToken.id, oldPassword, newPassword);

    ApiResponse(res, {
        success: true,
        message: 'User Password Changed successfully',
        statusCode: httpStatus.OK,
        data: result,
    });
});

//REFRESH TOKEN FUNCTION
const undoRefreshToken = catchAsync(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken || req.headers.authorization;

    const result = await AuthService.undoRefreshToken(refreshToken);

    setTokenAuthCookie(res, result);

    ApiResponse(res, {
        success: true,
        message: 'RefreshToken Undo Successfully.',
        statusCode: httpStatus.OK,
        data: result
    });
});

//LOG OUT USER
const logOutUser = catchAsync(async (req: Request, res: Response) => {

    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'none'
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'none'
    });


    ApiResponse(res, {
        success: true,
        message: 'User Logged Out Successfully.',
        statusCode: httpStatus.OK,
        data: null
    });
});

export const AuthController = {
    logInUser,
    changePassword,
    undoRefreshToken,
    logOutUser,
};