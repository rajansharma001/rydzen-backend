import { Router } from "express";
import { suspendUser } from "../controllers/adminControllers/manageUserController";

export const adminRoutes = Router();

adminRoutes.patch("/suspend-user", suspendUser);
