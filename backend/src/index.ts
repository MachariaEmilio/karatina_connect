// src/index.ts
import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();
const app = express();

// app.use(cors());
app.use(express.json());

app.use("/api", router); // All routes prefixed with /api

app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", message: "Route not found" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
