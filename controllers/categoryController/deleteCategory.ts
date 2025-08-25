import { Request, Response } from "express";
import { Category } from "../../model/categoryModel";

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    if (_id) {
      return res.status(404).json({ error: "Category Id not found." });
    }

    const checkCategory = await Category.findById(_id);
    if (checkCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    const deleteCategory = await Category.findByIdAndDelete(_id);
    if (!deleteCategory) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this category." });
    }
    return res
      .status(200)
      .json({ success: "Category deleted successfully.", checkCategory });
  } catch (error) {
    console.log("Bad Request for deleting an category.");
    return res
      .status(500)
      .json({ error: "Bad Request for deleting an category." });
  }
};
