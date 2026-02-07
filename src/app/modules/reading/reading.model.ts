import { model, Schema } from "mongoose";
import { IReading, ReadingProgress } from "./reading.interface";


const readingSchema = new Schema<IReading>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        progress: {
            type: String,
            enum: Object.values(ReadingProgress),
            default: ReadingProgress.WANT_TO_READ,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Reading = model<IReading>('Reading', readingSchema);