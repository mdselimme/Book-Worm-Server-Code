import { model, Schema } from "mongoose";
import { IReview, ReviewStatus } from "./review.interface";

const reviewModel = new Schema<IReview>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    reviewer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(ReviewStatus),
      default: ReviewStatus.PENDING,
    },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Review = model<IReview>("Review", reviewModel);
