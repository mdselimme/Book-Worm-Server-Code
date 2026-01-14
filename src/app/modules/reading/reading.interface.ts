import { Types } from "mongoose";

export enum ReadingProgress {
    WANT_TO_READ = 'WANT_TO_READ',
    CURRENTLY_READING = 'CURRENTLY_READING',
    READ = 'READ',
}

export interface IReading {
    _id?: string;
    user: Types.ObjectId;
    book: Types.ObjectId;
    progress: ReadingProgress;
    createdAt?: Date;
    updatedAt?: Date;
}