import express from "express";
import cors from "cors";

import { productsRoutes } from "./routes/product.routes.js";
import { categoryRoutes } from "./routes/category.routes.js";
import { userRoutes } from "./routes/user.routes.js";

import * as loggingMiddleware from "#src/middleware/logger.js";

import { mainLogger } from "#src/utils/loggers.js"; // Adjust the path as needed

const app = express();

app.use(cors());
app.use(express.json());

app.use(loggingMiddleware.infoLogger);

app.use("/categories", categoryRoutes);
app.use("/products", productsRoutes);
app.use("/user", userRoutes);

app.get("/simulateError", (req, res) => {
  try {
    throw new Error("AN ERROR :> BEACH");
  } catch (e) {
    next(error);
  }
  //   return res.status(500).json({ error: "AN ERROR :> BEACH" });
});

app.use(loggingMiddleware.errorLogger);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});

mainLogger.info("App started");

export default app;
