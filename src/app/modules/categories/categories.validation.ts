import z from "zod";

//category create validation
const createCategoryValidation = z.object({
    title: z.string({
        error: "Category name is required & must be a string"
    }).min(3, { error: "Category name must be at least 3 characters long" })
});

//category update validation
const updateCategoryValidation = z.object({
    title: z.string().min(3,
        { error: "Category name must be at least 3 characters long" }
    ).optional()
});

export const CategoryValidation = {
    createCategoryValidation,
    updateCategoryValidation
};