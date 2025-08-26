import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "../routes/authRoutes";
import { DBConnect } from "./DBConnect";
import { carRoutes } from "../routes/carRoutes";
import { adminRoutes } from "../routes/adminRoutes";
import { verifyRole } from "../middlewares/verifyRoles";
import { catRoute } from "../routes/catRoutes";
import { slideRoutes } from "../routes/sliderRoutes";
import { publicRoutes } from "../routes/publicRoutes";

const app = express();
dotenv.config();
const port = process.env.PORT || 7000;

DBConnect();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// routes

app.get("/", (req, res) => {
  res.send(`server running at port ${port}`);
});

// auth routes
app.use("/api/auth/", authRoutes);

// Car routes
app.use("/api/car", carRoutes);

// Car routes
app.use("/api/cat", catRoute);

// admin routes
app.use("/api/admin/", verifyRole(["admin"]), adminRoutes);

// manage slider routes
app.use("/api/slide", slideRoutes);

// public routes
app.use("/api/public", publicRoutes);
app.listen(port, () => {
  console.log(`Port Running at server  http://localhost:${port}`);
});
