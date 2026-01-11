/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from "../../utils/ApiError";
import { ICategory } from "./categories.interface";
import { Category } from './categories.model';
import { queryBuilder } from '../../utils/queryBuilder';


//CREATE CATEGORY SERVICE
const createCategoryService = async (categoryData: Partial<ICategory>) => {

    const categoryExists = await Category.findOne({ title: categoryData.title });

    if (categoryExists) {
        throw new ApiError(httpStatus.CONFLICT, 'Category already exists');
    }

    const newCategory = await Category.create(categoryData);

    return newCategory;
};

//Update CATEGORY SERVICE
const updateCategoryService = async (id: string, categoryData: Partial<ICategory>) => {
    const category = await Category.findById(id);

    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }

    if (categoryData.title === category.title) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide a different title to update because it is the same as the current one');
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, { new: true });
    return updatedCategory;
};

//GET ALL CATEGORIES SERVICE
const getAllCategoriesService = async (query: any) => {
    const { limit, page } = query;

    const categories = await queryBuilder({
        model: Category,
        query: {
            limit: limit,
            page: page
        },
    })
    return categories;
};

//DELETE CATEGORY SERVICE
const deleteCategoryService = async (id: string): Promise<ICategory | null> => {
    const category = await Category.findById(id);
    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Category data not found');
    }
    const deletedCategory = await Category.findByIdAndDelete(id);
    return deletedCategory;
};

export const CategoriesService = {
    createCategoryService,
    updateCategoryService,
    getAllCategoriesService,
    deleteCategoryService
};

