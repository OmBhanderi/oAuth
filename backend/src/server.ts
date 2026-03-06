import { AppDataSource } from "./config/data-source";
import { Request, Response } from "express";
import authRoutes from "./modules/auth/auth.routes";
import express from "express";
import cors from "cors";
import passport from "./config/passport";
import "dotenv/config";


const app = express();

const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(passport.initialize());

app.get("/", (_: Request, res: Response) => {
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
