import { Request, Response } from "express";
import { Slider } from "../../../model/slideModel";

export const getSlide = async (req: Request, res: Response) => {
  try {
    const getSlide = await Slider.find();
    if (getSlide.length == 0) {
      return res.status(404).json({ error: "Slider not found." });
    }
    return res
      .status(200)
      .json({ success: "Slider fetched Successfully.", getSlide });
  } catch (error) {
    console.error("Bad Request for fetching slide.", error);
    return res.status(500).json({ error: "Bad Request for fetching slider." });
  }
};

export const getSlideById = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const getSlideById = await Slider.findById(_id);
    if (!getSlideById) {
      return res.status(404).json({ error: "Slider not found." });
    }
    return res
      .status(200)
      .json({ success: "Slider By Id fetched Successfully.", getSlideById });
  } catch (error) {
    console.error("Bad Request for fetching slide.", error);
    return res.status(500).json({ error: "Bad Request for fetching slider." });
  }
};
