import { Request, Response } from "express";
import { CarDetails } from "../../model/carDetails";

export const deleteCarDetailsController = async (
  req: Request,
  res: Response
) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const checkCarById = await CarDetails.findById(_id);
    if (!checkCarById) {
      return res.status(400).json({ error: "Request Car details not found." });
    }

    const deleteCar = await CarDetails.findByIdAndDelete({ _id });
    if (!deleteCar) {
      return res
        .status(401)
        .json({ error: "You are not authorized to delete this data." });
    }

    return res
      .status(200)
      .json({ success: "Car details deleted Successfully.", deleteCar });
  } catch (error) {
    console.log("Bad Request for deleting an car details.", error);
    return res
      .status(500)
      .json({ error: "Bad Request for deleting an car details." });
  }
};
