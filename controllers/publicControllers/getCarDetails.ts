import { Request, Response } from "express";
import { Slider } from "../../model/slideModel";

export const getCarDetailsById = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(404).json({ error: "Id not foound." });
    }

    const getSlideById = await Slider.findById(_id);
    if (!getSlideById) {
      return res.status(404).json({ error: "Slide not found." });
    }
    return res
      .status(200)
      .json({ success: "Slide fetched successfully.", getSlideById });
  } catch (error) {
    console.error("Bad request for fetching car details by Id.", error);
    return res
      .status(500)
      .json({ error: "Bad request for fetching car details by Id." });
  }
};
