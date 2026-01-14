/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { IUser } from "./user.interface";
import { User } from "./user.model";
import ApiError from '../../utils/ApiError';
import { makeHashedPassword } from '../../utils/makeHashedPassword';
import { deleteImageFromCloudinary } from '../../config/cloudinary.config';

//USER REGISTER SERVICE FUNCTION
const registerUserService = async (userData: Partial<IUser>): Promise<Partial<IUser> | null> => {
    //if profile photo is not provided
    if (!userData.profilePhoto) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Profile photo is required.');
    }
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email: userData.email });
    // Check if user with the same email already exists
    if (existingUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Already have an account with this email.');
    };
    // Hash the password before saving
    const hashedPassword = await makeHashedPassword(userData.password as string);
    userData.password = hashedPassword;
    // Return the newly created user document
    const user = await User.create(userData);
    const newUserCreate = {
        _id: user._id,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified,
    };
    return newUserCreate;
};

//Update User Data Service Function
const updateUserService = async (userId: string, updateData: Partial<IUser>): Promise<Partial<IUser> | null> => {
    //find existing user
    const existingUser = await User.findById(userId);
    //if user not found
    if (!existingUser) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not found.');
    };
    //if profile photo is updated, delete the previous one from cloudinary
    if (updateData?.profilePhoto && existingUser.profilePhoto.includes('cloudinary.com')) {
        if (existingUser.profilePhoto) {
            await deleteImageFromCloudinary(existingUser.profilePhoto);
        }
    };
    //update user data
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
    ).select('_id name profilePhoto role');
    // return updatedUser data
    return updatedUser;
};


//Update User Role Service Function
const updateUserRoleService = async (email: string, role: string): Promise<Partial<IUser> | null> => {
    //find existing user by email
    const existingUser = await User.findOne({ email });
    //if user not found
    if (!existingUser) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not found.');
    };
    //if user already has the role
    if (existingUser.role === role.toUpperCase()) {
        throw new ApiError(httpStatus.BAD_REQUEST, `User is already assigned the role of ${role}.`);
    };
    //update user role
    const updatedUser = await User.findByIdAndUpdate(
        existingUser._id,
        { role },
        { new: true, runValidators: true }
    );
    return {
        role: updatedUser?.role
    };
};
//GET CURRENT USER SERVICE FUNCTION
const getCurrentUserService = async (userId: string): Promise<Partial<IUser> | null> => {
    //find existing user
    const existingUser = await User.findById(userId)
        .select('-password -createdAt -updatedAt');
    //if user not found
    if (!existingUser) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not found.');
    };
    return existingUser;
};

//GET ALL USERS SERVICE FUNCTION
const getAllUsersService = async (query: any): Promise<Partial<IUser>[] | null> => {
    const skip = (query.page || 0) * (query.limit || 10);
    const users = await User.find()
        .select('-password -createdAt -updatedAt');
    return users;
};


export const UserService = {
    registerUserService,
    updateUserService,
    updateUserRoleService,
    getCurrentUserService,
    getAllUsersService
};