import { Types } from "mongoose";


export interface IBook {
    _id?: Types.ObjectId;
    title: string;
    author: string;
    categories: Types.ObjectId[];
    description: string;
    coverImage: string;
    createdAt?: Date;
    updatedAt?: Date;
}