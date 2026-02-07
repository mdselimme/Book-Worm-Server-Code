import httpStatus from 'http-status';
import { Request, Response } from "express";
import ApiResponse from "../../utils/ApiResponse";
import { CategoriesService } from './categories.service';
import catchAsync from '../../utils/catchAsync';

//CREATE CATEGORY CONTROLLER
const createNewCategoryController = catchAsync(
    async (req: Request, res: Response) => {

        const result = await CategoriesService.createCategoryService(req.body);

        ApiResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: 'Category created successfully',
            data: result
        });
    })

//UPDATE CATEGORY CONTROLLER
const updateCategoryController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await CategoriesService.updateCategoryService(id as string, req.body);
    ApiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category updated successfully',
        data: result
    });
});

//GET ALL CATEGORIES CONTROLLER
const getAllCategoriesController = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoriesService.getAllCategoriesService(req.query);
    ApiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Categories retrieved successfully',
        data: result
    });
});

//DELETE CATEGORY CONTROLLER
const deleteCategoryController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await CategoriesService.deleteCategoryService(id as string);
    ApiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category deleted successfully',
        data: null
    });
});

export const CategoriesController = {
    createNewCategoryController,
    updateCategoryController,
    getAllCategoriesController,
    deleteCategoryController
};