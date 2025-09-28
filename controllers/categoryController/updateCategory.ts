import { Request, Response } from "express";
import { CatTypes } from "../../types/catTypes";
import { Category } from "../../model/categoryModel";

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(404).json({ error: "Category Id not found." });
    }
    const { catName, catSlug } = req.body as CatTypes;

    const getCategory = (await Category.findById(_id)) as CatTypes;
    if (!getCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    const file = req.file;
    if (!file) {
      return res.status(404).json({ error: "Category image not found." });
    }

    const categoryImg = file.path || "";

    const updateCategory = await Category.findByIdAndUpdate(_id, {
      catName: catName || getCategory.catName,
      catSlug: catSlug || getCategory.catSlug,
      catImg: categoryImg || getCategory.catImg,
    });

    if (!updateCategory) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this category." });
    }
    return res.status(200).json({ success: "Category updated Successfully." });
  } catch (error) {
    console.error("Bad Request for updating an category.", error);
    return res
      .status(500)
      .json({ error: "Bad request for updating an category." });
  }
};
