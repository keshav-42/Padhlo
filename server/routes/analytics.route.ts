import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  getCoursesAnalytics,
  getOrderAnalytics,
  getUsersAnalytics,
} from "../controllers/analytics.controller";
import { updateAccessToken } from "../controllers/user.controller";
const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-users-analytics",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  getUsersAnalytics
);

analyticsRouter.get(
  "/get-orders-analytics",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  getOrderAnalytics
);

analyticsRouter.get(
  "/get-courses-analytics",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  getCoursesAnalytics
);

export default analyticsRouter;
