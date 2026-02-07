import z from "zod";
import { ReadingProgress } from "./reading.interface";


//Want to read book validation schema
const wantToReadBookSchema = z.object({
    user: z.string({ error: "User ID is required" }).length(24, "Invalid user ID"),
    book: z.string({ error: "Book ID is required" }).length(24, "Invalid book ID"),
});

//update reading progress validation schema
const updateReadingProgressSchema = z.object({
    progress: z.enum(Object.values(ReadingProgress), { error: "Invalid reading progress" }),
});


export const readingValidation = {
    wantToReadBookSchema,
    updateReadingProgressSchema,
};