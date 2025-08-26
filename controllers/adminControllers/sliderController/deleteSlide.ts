import { Request, Response } from "express";
import { Slider } from "../../../model/slideModel";

export const deleteSlide = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;

    if (!_id) {
      return res.status(404).json({ error: "Id not foound." });
    }

    const checkSlide = await Slider.findById(_id);
    if (!checkSlide) {
      return res.status(404).json({ error: "Slide not found." });
    }

    const deleteSlide = await Slider.findByIdAndDelete(_id);
    if (!deleteSlide) {
      return res
        .status(403)
        .json({ error: "You are not authorized to perform this task." });
    }

    return res
      .status(200)
      .json({ success: "Category deleted Successfully.", checkSlide });
  } catch (error) {
    console.error("Bad request for deleting an slide. ", error);
    return res
      .status(500)
      .json({ error: "Bad request for deleting an slide." });
  }
};
