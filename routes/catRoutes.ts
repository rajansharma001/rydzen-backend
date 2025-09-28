import { Router } from "express";
import { newCategory } from "../controllers/categoryController/newCategory";
import { upload } from "../uploads/fileupload";
import { verifyRole } from "../middlewares/verifyRoles";
import { deleteCategory } from "../controllers/categoryController/deleteCategory";
import { updateCategory } from "../controllers/categoryController/updateCategory";
import {
  getCategory,
  getCategoryById,
} from "../controllers/categoryController/getCategory";

export const catRoute = Router();

catRoute.post(
  "/new-category",
  upload.single("catImg"),
  verifyRole(["admin"]),
  newCategory
);

catRoute.delete("/delete-category/:id", verifyRole(["admin"]), deleteCategory);
catRoute.patch(
  "/update-category/:id",
  upload.single("catImg"),
  verifyRole(["admin"]),
  updateCategory
);
catRoute.get("/get-category", getCategory);

catRoute.get("/get-singlecategory/:id", getCategoryById);
