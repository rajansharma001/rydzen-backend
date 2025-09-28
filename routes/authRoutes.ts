import { Request, Response, Router } from "express";
import { User } from "../model/userModel";
import { verifyToken } from "../middlewares/verifyToken";
import { logoutController } from "../controllers/authControllers/LogoutController";
import { LoginController } from "../controllers/authControllers/loginController";
import { verifEmail } from "../middlewares/verifyMail";
import { sessionController } from "../controllers/authControllers/sessionController";
import { singUpController } from "../controllers/authControllers/signUpController";

export const authRoutes = Router();

authRoutes.post("/register", singUpController);

authRoutes.post("/login", LoginController);

authRoutes.get("/logout", logoutController);

authRoutes.get("/users", verifyToken, async (req, res) => {
  try {
    const getUsers = await User.find();
    if (getUsers.length <= 0) {
      return res.status(404).json({ error: "User not found." });
    }
    return res
      .status(200)
      .json({ success: "User fetched successfully.", getUsers });
  } catch (error) {
    return res.status(500).json({ error: "Bad request for fetching users." });
  }
});

authRoutes.get("/verify-email/:token", verifEmail);

authRoutes.get("/session-user", sessionController);
