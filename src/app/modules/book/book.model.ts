import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";


const bookSchemaModel = new Schema<IBook>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: "Category",
                required: true,
            },
        ],
        description: {
            type: String,
            required: true,
            trim: true,
        },
        coverImage: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Book = model<IBook>("Book", bookSchemaModel);