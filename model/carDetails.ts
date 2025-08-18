import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    year: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    transmission: {
      type: String,
      trim: true,
    },
    fuelType: {
      type: String,
      trim: true,
    },
    seatingCapacity: {
      type: Number,
      trim: true,
    },
    mileage: {
      type: String,
      trim: true,
    },
    pricePerDay: {
      type: Number,
      trim: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const CarDetails =
  mongoose.models.CarDetails || mongoose.model("CarDetails", carSchema);
