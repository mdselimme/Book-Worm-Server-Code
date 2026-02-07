import { model, Schema } from "mongoose";
import { IUser, UserRole } from "./user.interface";



const userSchema = new Schema<IUser>({
    name: {
        type: String, required: [true, "Name is required"], trim: true
    },
    email: {
        type: String, required: [true, "Email is required"], unique: true, trim: true
    },
    password: {
        type: String, required: [true, "Password is required"], trim: true
    },
    role: {
        type: String, enum: Object.values(UserRole), default: UserRole.USER
    },
    isVerified: {
        type: Boolean, default: true
    },
    profilePhoto: {
        type: String, required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export const User = model<IUser>('User', userSchema);