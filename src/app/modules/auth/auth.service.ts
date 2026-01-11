import httpStatus from 'http-status';
import ApiError from "../../utils/ApiError"
import bcrypt from 'bcrypt';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { IJwtTokenPayload } from '../../types/token.type';
import { envVars } from '../../config/envVars';
import { generateToken, verifyToken } from '../../utils/jwtToken';




//AUTH LOGIN SERVICE 
const logInUser = async (payload: Partial<IUser>) => {
    //check user existing
    const existingUser = await User.findOne({ email: payload.email });
    //if user not found
    if (!existingUser) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User account not registered. Please sign up first.');
    };
    //check password match
    const isPasswordMatch = await bcrypt.compare(payload.password as string, existingUser.password);
    //if password not match
    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match. Please try with the correct password.');
    };
    //check user is verified
    if (!existingUser.isVerified) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User is not verified. Please verify your email.');
    }
    //generate jwt token
    const jwtUserPayload = {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
    };
    //generate access token
    const accessToken = generateToken(jwtUserPayload, envVars.JWT.ACCESS_TOKEN_SECRET, envVars.JWT.ACCESS_TOKEN_EXPIRED);
    //generate refresh token
    const refreshToken = generateToken(jwtUserPayload, envVars.JWT.REFRESH_TOKEN_SECRET, envVars.JWT.REFRESH_TOKEN_EXPIRED);
    //send data
    return {
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
        isVerified: existingUser.isVerified,
        accessToken,
        refreshToken
    };
};

//CHANGE PASSWORD SERVICE 
const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
    //find existing user
    const existingUser = await User.findById(userId);
    //if user not found
    if (!existingUser) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User data does not found.');
    }
    //check old password match
    const isPasswordMatch = await bcrypt.compare(oldPassword, existingUser.password);
    //if old password not match
    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
    };
    //if old password and new password are same
    if (oldPassword === newPassword) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Old password and new password cannot be same. Please use a different new password.');
    }
    //hash new password
    const hashedPassword = await bcrypt.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUNDS));
    //update user password
    await User.findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { new: true, runValidators: true }
    );
    //return success message
    return {
        message: 'Password changed successfully'
    }
};

//REFRESH TOKEN UNDO SERVICE
const undoRefreshToken = async (token: string) => {
    //verify refresh token
    const decodedToken = verifyToken(token, envVars.JWT.REFRESH_TOKEN_SECRET) as IJwtTokenPayload;
    //check user existing
    const isUserExists = await User.findById(decodedToken.id);
    //if user not found
    if (!isUserExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not found');
    };
    //check user is verified
    if (!isUserExists.isVerified) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User is not verified');
    }
    //generate new tokens
    const jwtUserPayload = {
        id: isUserExists._id,
        role: isUserExists.role,
        email: isUserExists.email,
    };
    //generate access token
    const accessToken = generateToken(jwtUserPayload, envVars.JWT.ACCESS_TOKEN_SECRET, envVars.JWT.ACCESS_TOKEN_EXPIRED);
    //generate refresh token
    const refreshToken = generateToken(jwtUserPayload, envVars.JWT.REFRESH_TOKEN_SECRET, envVars.JWT.REFRESH_TOKEN_EXPIRED);
    //return tokens
    return {
        accessToken,
        refreshToken
    };
};

export const AuthService = {
    logInUser,
    changePassword,
    undoRefreshToken
}