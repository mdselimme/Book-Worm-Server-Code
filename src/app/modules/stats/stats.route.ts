import { Router } from "express";
import { StatsController } from "./stats.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";

const router = Router();

// Admin stats route - Only accessible by admins
router.get(
    "/admin",
    checkAuth(UserRole.ADMIN),
    StatsController.getAdminStats
);

// User stats route - Accessible by authenticated users
router.get(
    "/user",
    checkAuth(UserRole.USER, UserRole.ADMIN),
    StatsController.getUserStats
);

export const StatsRoutes = router;
