import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";
import { verifyToken } from '../utils/jwtToken';
import { User } from '../modules/user/user.model';
import { envVars } from '../config/envVars';
import { IJwtTokenPayload } from '../types/token.type';




//User Role Check Auth
export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        //check access token from headers or cookies
        const accessToken = req.headers.authorization || req.cookies.accessToken;
        //if no token found throw error
        if (!accessToken) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'No Authentication token provided');
        };
        //verify token 
        const verifiedToken = verifyToken(accessToken as string, envVars.JWT.ACCESS_TOKEN_SECRET) as IJwtTokenPayload;
        //if token is invalid
        if (!verifiedToken) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Authentication token');
        };
        //check user existence
        const isUserExist = await User.findOne({ email: verifiedToken.email });
        //if user not found
        if (!isUserExist) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User does not found');
        }
        //check user is verified or not
        if (isUserExist.isVerified === false) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'User is not verified');
        };
        //check user role authorization
        if (authRoles.length && !authRoles.includes(isUserExist.role)) {
            throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to access this resource.');
        };
        //attach verified token to req.user
        req.user = verifiedToken;
        next();
    } catch (error) {
        next(error);
    }
};