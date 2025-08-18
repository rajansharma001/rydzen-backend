import { Request, Response, Router } from "express";
import { User } from "../model/userModel";
import { verifyToken } from "../middlewares/verifyToken";
import { logoutController } from "../controllers/authControllers/LogoutController";
import { LoginController } from "../controllers/authControllers/loginController";
import { verifEmail } from "../middlewares/verifyMail";

export const authRoutes = Router();

authRoutes.get("/login", LoginController);

authRoutes.get("/logout", logoutController);

authRoutes.get("/users", verifyToken, async (req, res) => {
  const getUser = await User.find();
  console.log(getUser);
});

authRoutes.get("/verify-email/:token", verifEmail);
