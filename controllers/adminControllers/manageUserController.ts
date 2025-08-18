import { Request, Response } from "express";
import { User } from "../../model/userModel";

export const suspendUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User Id not found.", userId });
    }
    const findUser = await User.findOne({ _id: userId });
    if (!findUser) {
      return res.status(404).json({ error: "User not found.", userId });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isSuspend: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(403)
        .json({ error: "You are not authorized to modify this user.", userId });
    }

    return res
      .status(200)
      .json({ success: "User suspended successfully.", updatedUser });
  } catch (error) {
    console.error("Bad request for suspending an user.", error);
    return res
      .status(500)
      .json({ error: "Bad request for suspending an user." });
  }
};

export const unSuspendUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User Id not found.", userId });
    }
    const findUser = await User.findOne({ _id: userId });
    if (!findUser) {
      return res.status(404).json({ error: "User not found.", userId });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isSuspend: false,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(403)
        .json({ error: "You are not authorized to modify this user.", userId });
    }

    return res
      .status(200)
      .json({ success: "User unsuspended successfully.", updatedUser });
  } catch (error) {
    console.error("Bad request for suspending an user.", error);
    return res
      .status(500)
      .json({ error: "Bad request for suspending an user." });
  }
};
