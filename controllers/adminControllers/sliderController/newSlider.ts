import { Request, Response } from "express";
import { SlideTypes } from "../../../types/slideTypes";
import { Slider } from "../../../model/slideModel";

export const newSlide = async (req: Request, res: Response) => {
  try {
    const { slideText, btnTitle, btnLink } = req.body as SlideTypes;

    if (!slideText || !btnLink || !btnTitle) {
      return res
        .status(404)
        .json({ error: "Please provide all required fields." });
    }

    const file = req.file;

    if (!file) {
      return res.status(404).json({ error: "Please provide category image." });
    }

    const slideImg = file?.path || "";

    const newSlide = await Slider.create({
      slideText,
      slideImage: slideImg,
      btnLink,
      btnTitle,
    });

    if (!newSlide) {
      return res
        .status(403)
        .json({ error: "You are not authorized to perform this task." });
    }
    return res
      .status(201)
      .json({ success: "New Slide added successfully.", newSlide });
  } catch (error) {
    console.error("Bad request for creating an slide. ", error);
    return res
      .status(500)
      .json({ error: "Bad request for creating an slide." });
  }
};
