import z from "zod";

const YOUTUBE_URL_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/)|youtu\.be\/)[a-zA-Z0-9_-]{11}(\S+)?$/;

//create tutorial validation here in future
const createTutorialZodSchema = z.object({
    title: z.string({ error: "Title is required" }).min(3, "Title must be at least 3 characters long"),
    videoUrl:
        z.url({ error: "Video URL is required & valid." })
            .regex(YOUTUBE_URL_REGEX, { error: "Only valid YouTube video URLs are allowed" }),
});

//UPDATE tutorial validation
const updateTutorialZodSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").optional(),
    videoUrl:
        z.url({ error: "Video URL is must be valid." })
            .regex(YOUTUBE_URL_REGEX, { error: "Only valid YouTube video URLs are allowed" })
            .optional(),
});


export const TutorialValidation = {
    createTutorialZodSchema,
    updateTutorialZodSchema
};