import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    slideText: {
      type: String,
      trim: true,
    },
    btnTitle: {
      type: String,
      trim: true,
    },
    btnLink: {
      type: String,
      trim: true,
    },
    slideImage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Slider =
  mongoose.models.Slider || mongoose.model("Slider", sliderSchema);
