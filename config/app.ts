import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "../routes/authRoutes";

const app = express();
dotenv.config();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:7000",
    credentials: true,
  })
);

// routes

app.get("/", (req, res) => {
  res.send(`server running at port ${port}`);
});

// auth routes
app.use("/api/auth/", authRoutes);

app.listen(port, () => {
  console.log(`Port Running at server  http://localhost:${port}`);
});
