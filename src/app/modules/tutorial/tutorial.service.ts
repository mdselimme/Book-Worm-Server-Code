import httpStatus from 'http-status';
import ApiError from "../../utils/ApiError";
import { ITutorial } from "./tutorial.interface";
import { Tutorial } from "./tutorial.model";


//CREATE TUTORIAL SERVICE 
const createTutorial = async (payload: ITutorial): Promise<ITutorial> => {
    //check for existing tutorial with same title
    const tutorial = await Tutorial.find({ title: payload.title });
    if (tutorial) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Tutorial with this title already exists.');
    }
    //create tutorial
    const result = await Tutorial.create(payload);
    return result;
};

//UPDATE TUTORIAL SERVICE
const updateTutorial = async (id: string, payload: Partial<ITutorial>): Promise<ITutorial | null> => {
    //check for existing tutorial
    const tutorial = await Tutorial.findById(id);
    if (!tutorial) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Tutorial not found.');
    };
    //check for existing tutorial with same title
    const existingTutorial = await Tutorial.find({ title: payload.title });
    if (existingTutorial) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Tutorial with this title already exists.');
    }
    //update tutorial
    const updatedTutorial = await Tutorial.findByIdAndUpdate(id
        , payload
        , { new: true, runValidators: true });
    return updatedTutorial;
};

export const TutorialService = {
    createTutorial,
    updateTutorial,
};