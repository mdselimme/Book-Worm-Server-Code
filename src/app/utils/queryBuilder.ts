/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IQueryOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
}

import { Model, PopulateOptions } from "mongoose";

interface QueryBuilderParams<T> {
    model: Model<T>;
    filter?: Record<string, any>;
    query: IQueryOptions;
    searchFields?: string[];
    populate?: PopulateOptions | PopulateOptions[];
}

export const queryBuilder = async <T>({
    model,
    filter = {},
    query,
    searchFields = [],
    populate,
}: QueryBuilderParams<T>) => {

    // Pagination
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    // Sorting
    const sortBy = query.sortBy || "createdAt";
    const sortOrder: 1 | -1 = query.sortOrder === "asc" ? 1 : -1;
    const sortCondition: Record<string, 1 | -1> = { [sortBy]: sortOrder };

    // Search
    const finalFilter: Record<string, any> = { ...filter };

    if (query.search && searchFields.length > 0) {
        finalFilter.$or = searchFields.map(field => ({
            [field]: { $regex: query.search, $options: "i" },
        }));
    }

    // Base Query
    let mongooseQuery = model
        .find(finalFilter)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);

    // Populate
    if (populate) {
        mongooseQuery = mongooseQuery.populate(populate);
    }

    // Execute
    const data = await mongooseQuery;
    const total = await model.countDocuments(finalFilter);

    return {
        meta: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
        data,
    };
};
