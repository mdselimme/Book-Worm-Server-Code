import z from "zod";

//book create validation
const createBookValidation = z.object({
    title: z.string({
        error: "Book name is required & must be a string"
    }).min(3, { error: "Book name must be at least 3 characters long" }),
    author: z.string({
        error: "Author name is required & must be a string"
    }).min(3, { error: "Author name must be at least 3 characters long" }),
    categories: z.array(z.string().length(24, { error: "Invalid category ID" }), {
        error: "Categories are required & must be an array of category IDs"
    }).min(1, { error: "At least one category is required" }),
    description: z.string({
        error: "Book description is required & must be a string"
    }).min(10, { error: "Book description must be at least 10 characters long" }),
});

//book update validation
const updateBookValidation = z.object({
    title: z.string({
        error: "Book name is required & must be a string"
    }).min(3, { error: "Book name must be at least 3 characters long" }).optional(),
    author: z.string({
        error: "Author name is required & must be a string"
    }).min(3, { error: "Author name must be at least 3 characters long" }).optional(),
    categories: z.array(z.string().length(24, { error: "Invalid category ID" }), {
        error: "Categories are required & must be an array of category IDs"
    }).min(1, { error: "At least one category is required" }).optional(),
    description: z.string({
        error: "Book description is required & must be a string"
    }).min(10, { error: "Book description must be at least 10 characters long" }).optional(),
});

export const BookValidation = {
    createBookValidation,
    updateBookValidation
};