/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from "../../utils/ApiError";
import { ICategory } from "./categories.interface";
import { Category } from './categories.model';
import { queryBuilder } from '../../utils/queryBuilder';


//CREATE CATEGORY SERVICE
const createCategoryService = async (categoryData: Partial<ICategory>) => {
    // Check for existing category with the same title
    const categoryExists = await Category.findOne({ title: categoryData.title });
    // If found, throw conflict error
    if (categoryExists) {
        throw new ApiError(httpStatus.CONFLICT, 'Category title already exists. Please choose a different title.');
    }
    // If not found, create new category
    const newCategory = await Category.create(categoryData);
    return newCategory;
};

//Update CATEGORY SERVICE
const updateCategoryService = async (id: string, categoryData: Partial<ICategory>) => {
    // Check if category exists
    const category = await Category.findById(id);
    // If not found, throw not found error
    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }
    // If the title is being updated, check for uniqueness
    if (categoryData.title === category.title) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide a different title to update because it is the same as the current one');
    }
    // Check for existing category with the same title
    const categoryExists = await Category.findOne({ title: categoryData.title });
    // If found, throw conflict error
    if (categoryExists) {
        throw new ApiError(httpStatus.CONFLICT, 'Category title already exists. Please choose a different title.');
    }
    // If not found, update category
    const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, { new: true });
    return updatedCategory;
};

//GET ALL CATEGORIES SERVICE
const getAllCategoriesService = async (query: any) => {
    // Destructure pagination parameters
    const { limit, page, search } = query;
    // Use query builder to get categories with pagination
    // const categories = await queryBuilder({
    //     model: Category,
    //     query: {
    //         limit: limit,
    //         page: page,
    //         search: search,
    //     },
    //     searchFields: ['title'],
    // })
    const categories = await Category.find();
    return categories;
};

//DELETE CATEGORY SERVICE
const deleteCategoryService = async (id: string): Promise<ICategory | null> => {
    // Check if category exists
    const category = await Category.findById(id);
    // If not found, throw not found error
    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Category data not found');
    }
    // If found, delete category
    const deletedCategory = await Category.findByIdAndDelete(id);
    return deletedCategory;
};

export const CategoriesService = {
    createCategoryService,
    updateCategoryService,
    getAllCategoriesService,
    deleteCategoryService
};

