
import { env } from "node:process";
import { AppDataSource } from "./config/data-source";
import { Request,Response } from "express";
import authRoutes from "./modules/auth/auth.routes"
import dotenv from "dotenv";
dotenv.config();
const express = require("express");
const cors = require("cors");

const app = express();
// dotenv.config();

const PORT = env.PORT;
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes)

app.get("/", (_: Request , res: Response ) => {
  res.send("Server is running successfully");
});
AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed ❌", error);
  });

app.listen(PORT, () => {
  console.log(`\n\n\nBackend is running on http://localhost:${PORT}\n\n\n`);
});
