import { Router } from "express";
import {
  changePassword,
  getProfile,
  updateProfileImage,
} from "../controllers/userController.ts/getProfile";
import { verifyRole } from "../middlewares/verifyRoles";
import { upload } from "../uploads/fileupload";

export const userRoute = Router();

userRoute.get("/profile", verifyRole(["admin", "user"]), getProfile);
userRoute.patch(
  "/profile/change-password",
  verifyRole(["admin", "user"]),
  changePassword
);

userRoute.patch(
  "/profile/update-profile-image",
  upload.single("profileImg"),
  verifyRole(["admin", "user"]),
  updateProfileImage
);
