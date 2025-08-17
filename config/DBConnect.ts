import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const DBConnect = async () => {
  try {
    const mongo_uri = process.env.MONGO_URI!;

    const connectDb = await mongoose.connect(mongo_uri);
    if (!connectDb) {
      console.log("DB Connection Failed.");
    }
    console.log("DB Connected Successfully.");
  } catch (error) {
    console.log("Something went wrong while connecting DB.", error);
    process.exit(1);
  }
};
