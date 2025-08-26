import { Router } from "express";
import { getCarDetailsById } from "../controllers/publicControllers/getCarDetails";

export const publicRoutes = Router();

publicRoutes.get("/get-car-details", getCarDetailsById);
