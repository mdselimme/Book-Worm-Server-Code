/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import rateLimit from "express-rate-limit";
import ApiError from "../utils/ApiError";
import { envVars } from '../config/envVars';

export const apiLimiter = rateLimit({
    windowMs: Number(envVars.RATE_LIMITER.RATE_LIMITER_WINDOW_MS), // 15 minutes
    max: Number(envVars.RATE_LIMITER.RATE_LIMITER_API_MAX_REQUEST),
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        throw new ApiError(httpStatus.TOO_MANY_REQUESTS, "Too many requests from this IP, please try again later.");
    },
});

export const authLimiter = rateLimit({
    windowMs: Number(envVars.RATE_LIMITER.RATE_LIMITER_WINDOW_MS),
    max: Number(envVars.RATE_LIMITER.RATE_LIMITER_AUTH_MAX_REQUEST),
    handler: (req, res) => {
        throw new ApiError(httpStatus.TOO_MANY_REQUESTS, "Too many login attempts from this IP, please try again later.");
    },
    skipSuccessfulRequests: true,
});