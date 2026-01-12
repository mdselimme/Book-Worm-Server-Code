import { model, Schema } from "mongoose";
import { ITutorial } from "./tutorial.validation";


const tutorialSchema = new Schema<ITutorial>({
    title: { type: String, required: true, unique: true },
    tutorialId: { type: String, required: true, unique: true },
    description: { type: String },
}, {
    timestamps: true,
    versionKey: false,
});

export const Tutorial = model<ITutorial>("Tutorial", tutorialSchema);