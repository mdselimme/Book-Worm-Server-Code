import { model, Schema } from "mongoose";
import { ITutorial } from "./tutorial.interface";



const tutorialSchema = new Schema<ITutorial>({
    title: { type: String, required: true, unique: true },
    videoUrl: { type: String, required: true, unique: true },
}, {
    timestamps: true,
    versionKey: false,
});

export const Tutorial = model<ITutorial>("Tutorial", tutorialSchema);