import { Router } from "express";
import { newCarController } from "../controllers/carControllers/newCarController";
import { verifyToken } from "../middlewares/verifyToken";
import {
  getCarDetailsByIdController,
  getCarDetailsController,
} from "../controllers/carControllers/getCarDetailsController";
import { deleteCarDetailsController } from "../controllers/carControllers/deleteCarDetailsContoller";
import { updateCarDetailsController } from "../controllers/carControllers/updateCarDetailController";
import { verifyRole } from "../middlewares/verifyRoles";
import { upload } from "../uploads/fileupload";

export const carRoutes = Router();

carRoutes.post(
  "/new-car",
  upload.single("image"),
  verifyRole(["admin"]),
  newCarController
);
carRoutes.delete(
  "/car-details/delete/:id",
  verifyRole(["admin"]),
  deleteCarDetailsController
);
carRoutes.patch(
  "/car-details/update/:id",
  upload.single("image"),
  verifyRole(["admin"]),
  updateCarDetailsController
);

carRoutes.get("/car-details", getCarDetailsController);
carRoutes.get("/car-details/:id", getCarDetailsByIdController);
