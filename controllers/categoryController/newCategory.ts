import { Request, Response } from "express";
import { CatTypes } from "../../types/catTypes";
import { Category } from "../../model/categoryModel";
export const newCategory = async (req: Request, res: Response) => {
  try {
    const { catName, catSlug, catImg } = req.body as CatTypes;
    if (!catName || !catSlug || !catImg) {
      return res
        .status(404)
        .json({ error: "Please fill all required fields." });
    }

    const file = req.file;
    if (!file) {
      return res.status(404).json({ error: "Please provide car an image." });
    }
    const finalCatImg = file?.path || "";
    const newCategory = await Category.create({
      catName,
      catSlug,
      catImg: finalCatImg,
    });

    if (!newCategory) {
      return res
        .status(403)
        .json({ error: "You are not authorized to create a new category." });
    }
    return (
      res.status(201).json({ success: "Category Created successflly." }),
      newCategory
    );
  } catch (error) {
    console.log("Bad request for creating new Category.", error);
    return res
      .status(500)
      .json({ error: "Bad Request for creating new category" });
  }
};
