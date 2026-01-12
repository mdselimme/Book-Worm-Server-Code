import { Types } from "mongoose";

export enum ReviewStatus {
  PENDING = "PENDING",
  APPROVE = "APPROVE",
  DECLINED = "DECLINED",
}

export interface IReview {
  _id?: string;
  book: Types.ObjectId;
  reviewer: Types.ObjectId;
  rating: number;
  status: ReviewStatus;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
