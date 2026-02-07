import { Types } from "mongoose";

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER'
};

export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    profilePhoto: string;
    role: UserRole;
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}