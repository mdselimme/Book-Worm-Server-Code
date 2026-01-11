import httpStatus from 'http-status';
import { IUser } from "./user.interface";
import { User } from "./user.model";
import ApiError from '../../utils/ApiError';
import { makeHashedPassword } from '../../utils/makeHashedPassword';

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

export const UserService = {
    registerUserService,
};