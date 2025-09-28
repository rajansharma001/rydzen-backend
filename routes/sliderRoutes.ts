import { Router } from "express";
import { newSlide } from "../controllers/adminControllers/sliderController/newSlider";
import { upload } from "../uploads/fileupload";
import { verifyRole } from "../middlewares/verifyRoles";
import { updateSlide } from "../controllers/adminControllers/sliderController/updateSlide";
import { deleteSlide } from "../controllers/adminControllers/sliderController/deleteSlide";
import {
  getSlide,
  getSlideById,
} from "../controllers/adminControllers/sliderController/getSlide";

export const slideRoutes = Router();

slideRoutes.post(
  "/new-slide",
  upload.single("slideImage"),
  verifyRole(["admin"]),
  newSlide
);

slideRoutes.patch(
  "/slide-update/:id",
  upload.single("slideImage"),
  verifyRole(["admin"]),
  updateSlide
);

slideRoutes.delete("/delete-slide/:id", verifyRole(["admin"]), deleteSlide);

slideRoutes.get("/get-slide", getSlide);

slideRoutes.get("/get-singleslide/:id", getSlideById);
