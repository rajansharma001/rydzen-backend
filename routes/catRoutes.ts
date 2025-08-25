import { Router } from "express";
import { newCategory } from "../controllers/categoryController/newCategory";
import { upload } from "../uploads/fileupload";

export const catRoute = Router();

catRoute.post("/new-category", upload.single("catImg"), newCategory);
