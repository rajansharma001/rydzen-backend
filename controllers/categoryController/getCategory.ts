import { Request, Response } from "express";
import { Category } from "../../model/categoryModel";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const fetchCategory = await Category.find();
    return res
      .status(200)
      .json({ success: "Category fetched Successfully.", fetchCategory });
  } catch (error) {
    console.error("Bad Request for fetching category.", error);
    return res
      .status(500)
      .json({ error: "Bad request for fetching category." });
  }
};
