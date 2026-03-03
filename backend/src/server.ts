import dotenv from "dotenv";
import { env } from "node:process";

const express = require("express");
const cors = require("cors");

const app = express();
// dotenv.config();

const PORT = env.PORT;
app.use(cors());
app.use(express.json());

app.get("/", (_,res) => {
res.send("Server is running successfully")
});

app.listen(PORT, () => {
  console.log(`\n\n\nBackend is running on http://localhost:${PORT}\n\n\n`);
});
