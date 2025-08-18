import { Request, Response } from "express";
import { CarDetails } from "../../model/carDetails";

export const getCarDetailsController = async (req: Request, res: Response) => {
  try {
    const getCarDetails = await CarDetails.find();
    if (!getCarDetails || getCarDetails.length === 0) {
      return res.status(400).json({ error: "Car details not found." });
    }

    return res
      .status(200)
      .json({ success: "Car details fetched Successfully.", getCarDetails });
  } catch (error) {
    console.log("Bad Request for getting car details.", error);
    return res
      .status(500)
      .json({ error: "Bad Request for getting car details." });
  }
};
