import { Request, Response, Router } from "express";
import { User } from "../model/userModel";
import { LoginController } from "../controllers/loginController";
import { verifyToken } from "../middlewares/verifyToken";
import { logoutController } from "../controllers/LogoutController";

export const authRoutes = Router();

authRoutes.get("/login", LoginController);

authRoutes.get("/logout", logoutController);

authRoutes.get("/users", verifyToken, async (req, res) => {
  const getUser = await User.find();
  console.log(getUser);
});
