import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../model/userModel";

export const LoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const getUser = await User.findOne({ email });
    if (!getUser) {
      return res.status(403).json({ error: `${email} is not found.` });
    }

    if (!getUser.isVerified) {
      return res
        .status(401)
        .json({ error: `your email: ${email} is not verified.` });
    }

    const comparedPassword = await bcrypt.compare(password, getUser.password);
    if (!comparedPassword) {
      return res
        .status(401)
        .json({ error: `Password did not match. Please try again.` });
    }

    const secret = process.env.TOKEN_SECRET as string;
    const token = jwt.sign({ id: getUser._id }, secret, { expiresIn: "1h" });

    return res
      .cookie("TOKEN", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
      })
      .status(200)
      .json({ success: `Logged in successfully.` });
  } catch (error) {
    console.log("Bad Request for Login", error);
    return res.status(500).json({ error: "Bad Request for Login." });
  }
};
