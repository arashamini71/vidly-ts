import dotenv from "dotenv";
import express from "express";
import { connectMongo } from "./startup/mongo";
import { initializeLogger } from "./startup/logger";
import { initializeMiddlewares } from "./startup/middlewares";

dotenv.config();
const app = express();

(async () => {
  initializeLogger();
  await connectMongo();
  console.log("Connected to mongo");
  initializeMiddlewares(app);
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port :${PORT}`);
  });
})();
