import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    catName: {
      type: String,
      trim: true,
    },
    catSlug: {
      type: String,
      trim: true,
    },
    catImg: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
