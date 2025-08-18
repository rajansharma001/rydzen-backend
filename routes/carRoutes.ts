import { Router } from "express";
import { newCarController } from "../controllers/carControllers/newCarController";
import { verifyToken } from "../middlewares/verifyToken";
import { getCarDetailsController } from "../controllers/carControllers/getCarDetailsController";
import { deleteCarDetailsController } from "../controllers/carControllers/deleteCarDetailsContoller";
import { updateCarDetailsController } from "../controllers/carControllers/updateCarDetailController";
import { verifyRole } from "../middlewares/verifyRoles";

export const carRoutes = Router();

carRoutes.post("/new-car", verifyRole(["admin"]), newCarController);
carRoutes.delete(
  "/car-details/delete/:id",
  verifyRole(["admin"]),
  deleteCarDetailsController
);
carRoutes.patch(
  "/car-details/update/:id",
  verifyRole(["admin"]),
  updateCarDetailsController
);

carRoutes.get("/car-details", getCarDetailsController);
