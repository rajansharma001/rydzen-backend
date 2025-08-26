import { Request, Response } from "express";
import { Slider } from "../../../model/slideModel";
import { SlideTypes } from "../../../types/slideTypes";

export const updateSlide = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;

    if (!_id) {
      return res.status(404).json({ error: "Id not foound." });
    }

    const { btnTitle, btnLink, slideText } = req.body as SlideTypes;
    const file = req.file;
    const SlideImg = file?.path || "";

    const getSlide = (await Slider.findById(_id)) as SlideTypes;
    if (!getSlide) {
      return res.status(404).json({ error: "Slide not found." });
    }

    const updateSlide = await Slider.findByIdAndUpdate(_id, {
      btnTitle: btnTitle || getSlide.btnTitle,
      btnLink: btnLink || getSlide.btnLink,
      slideImage: SlideImg || getSlide.slideImage,
      slideText: slideText || getSlide.slideText,
    });
    if (!updateSlide) {
      return res
        .status(403)
        .json({ error: "You are not authorized to perform this task." });
    }
    return res.status(200).json({ success: "Slider updated successfully." });
  } catch (error) {
    console.error("Bad request for updating an slide.");
    return res
      .status(500)
      .json({ error: "Bad Request for updating an slide." });
  }
};
