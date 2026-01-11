import { model, Schema } from "mongoose";
import { ICategory } from "./categories.interface";


const categorySchema = new Schema<ICategory>({
    title: { type: String, required: true, unique: true }
}, {
    versionKey: false,
    timestamps: true
});

export const Category = model<ICategory>("Category", categorySchema);