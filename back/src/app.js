import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { productsRoutes } from "./routes/product.routes.js";
import { categoryRoutes } from "./routes/category.routes.js";
import { userRoutes } from "./routes/user.routes.js";

import * as loggingMiddleware from "#src/middleware/logger.js";

import { mainLogger as ml } from "#src/utils/loggers.js"; // Adjust the path as needed

const app = express();

app.use(cors());
app.use(express.json());

app.use(loggingMiddleware.infoLogger);

app.use("/categories", categoryRoutes);
app.use("/products", productsRoutes);
app.use("/user", userRoutes);

app.use(loggingMiddleware.errorLogger);

app.get("/err", (req, res) => {
  throw new Error("This is an error!");
});

app.all("*", (req, res, next) => {
  const err = new Error(`${req.originalUrl} not found!`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});

// Error handling middleware
app.use((error, req, res, next) => {
  ml.error(error.stack);

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
});

export default app;
