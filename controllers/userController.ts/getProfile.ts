import { Request, Response } from "express";
import { User } from "../../model/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface MyPayload extends jwt.JwtPayload {
  _id: string;
}
export const getProfile = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.TOKEN;

    console.log("Token :", token);
    if (!token) return res.status(404).json({ msg: "Token not found." });
    const secret = process.env.TOKEN_SECRET;
    console.log(secret);
    if (!secret) {
      throw new Error("TOKEN_SECRET is not defined in environment variables");
    }
    const decoded = jwt.verify(token, secret) as MyPayload;
    console.log("Decoded: ", decoded);
    const userId = decoded.id;
    const userProfile = await User.findById(userId);
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found." });
    }
    return res
      .status(200)
      .json({ success: "Profile fetched successfully.", userProfile });
  } catch (error) {
    return res.status(500).json({ error: "Bad request for fetching profile." });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.TOKEN;
    console.log("TOKEN", token);
    if (!token) {
      return res.status(404).json({ error: "Token not found." });
    }
    const { oldPassword, newPassword } = req.body;
    console.log("req body: ", req.body);

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Please fill all required fields." });
    }
    const secret = process.env.TOKEN_SECRET;
    console.log(secret);
    if (!secret) {
      throw new Error("TOKEN_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(token, secret) as MyPayload;
    console.log("Decoded: ", decoded);
    const userId = decoded.id;
    const userProfile = await User.findById(userId);
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found." });
    }
    console.log("userProfile: ", userProfile);

    const decodePassword = await bcrypt.compare(
      oldPassword,
      userProfile.password
    );

    if (!decodePassword) {
      return res.status(403).json({
        error: "password did not match. Please try again.",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    return res.status(200).json({ success: "Password updated successfully." });
  } catch (error) {
    console.log("Bad Request for updating password.");
    return res
      .status(500)
      .json({ error: "Bad request for updating password." });
  }
};

export const updateProfileImage = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.TOKEN;

    console.log("Token :", token);
    if (!token) return res.status(404).json({ msg: "Token not found." });
    const secret = process.env.TOKEN_SECRET;
    console.log(secret);
    if (!secret) {
      throw new Error("TOKEN_SECRET is not defined in environment variables");
    }
    const decoded = jwt.verify(token, secret) as MyPayload;
    console.log("Decoded: ", decoded);
    const userId = decoded.id;
    const userProfile = await User.findById(userId);
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found." });
    }

    console.log(userProfile);
    const file = req.file;
    if (!file) {
      return res.status(404).json({ error: "Profile Image not found." });
    }
    console.log(file);
    const profileImg = file?.path || "";

    await User.findByIdAndUpdate(userId, { profileImg: profileImg });
    return res
      .status(200)
      .json({ success: "Profile image updated successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Bad request for updating profile image." });
  }
};
