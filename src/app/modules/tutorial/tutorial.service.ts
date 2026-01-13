/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../utils/ApiError";
import { ITutorial } from "./tutorial.interface";
import { Tutorial } from "./tutorial.model";

//CREATE TUTORIAL SERVICE
const createTutorial = async (payload: ITutorial): Promise<ITutorial> => {
  //check for existing tutorial with same title
  const tutorial = await Tutorial.find({ title: payload.title });
  if (tutorial.length > 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Tutorial with this title already exists."
    );
  }
  //create tutorial
  const result = await Tutorial.create(payload);
  return result;
};

//UPDATE TUTORIAL SERVICE
const updateTutorial = async (
  id: string,
  payload: Partial<ITutorial>
): Promise<ITutorial | null> => {
  //check for existing tutorial
  const tutorial = await Tutorial.findById(id);
  if (!tutorial) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tutorial not found.");
  }
  //check for existing tutorial with same title
  const existingTutorial = await Tutorial.find({ title: payload.title });
  if (existingTutorial.length > 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Tutorial with this title already exists."
    );
  }
  //update tutorial
  const updatedTutorial = await Tutorial.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updatedTutorial;
};

//GET TUTORIAL BY ID SERVICE
const getTutorialById = async (id: string): Promise<ITutorial | null> => {
  const tutorial = await Tutorial.findById(id);
  if (!tutorial) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tutorial data does not found.");
  }
  return tutorial;
};

//DELETE TUTORIAL SERVICE
const deleteTutorial = async (id: string): Promise<void> => {
  const tutorial = await Tutorial.findById(id);
  if (!tutorial) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tutorial data does not found.");
  }
  await Tutorial.findByIdAndDelete(id);
};

//GET ALL TUTORIALS SERVICE
const getAllTutorials = async (query: any): Promise<ITutorial[]> => {
  const skip = (query.page || 0) * (query.limit || 10);
  const tutorials = await Tutorial.find({});

  return tutorials;
};

export const TutorialService = {
  createTutorial,
  updateTutorial,
  getTutorialById,
  deleteTutorial,
  getAllTutorials,
};
