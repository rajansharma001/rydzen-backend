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
        isSuspend: !findUser.isSuspend,
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
    return res
      .status(500)
      .json({ error: "Bad request for suspending an user." });
  }
};
