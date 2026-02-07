import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import ApiResponse from "../../utils/ApiResponse";
import { StatsService } from "./stats.service";

// Get Admin Stats
const getAdminStats = catchAsync(async (req, res) => {
    const result = await StatsService.getAdminStats();

    ApiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin statistics retrieved successfully",
        data: result
    });
});

// Get User Stats
const getUserStats = catchAsync(async (req, res) => {
    const userId = req.user?.id;

    const result = await StatsService.getUserStats(userId);

    ApiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User statistics retrieved successfully",
        data: result
    });
});

export const StatsController = {
    getAdminStats,
    getUserStats
};
