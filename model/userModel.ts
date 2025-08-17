import mongoose, { Model } from "mongoose";

const UserModel = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
    },
  },
  { timestamps: true }
);
export const User = mongoose.models.User || mongoose.model("User", UserModel);
