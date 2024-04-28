import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { productsRoutes } from "./routes/product.routes.js";
import { categoryRoutes } from "./routes/category.routes.js";
import { userRoutes } from "./routes/user.routes.js";

import * as loggingMiddleware from "#src/middleware/logger.js";
import { errorHandlingMiddleware } from "./middleware/error_handling.js";

import _Error from "./utils/error.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(loggingMiddleware.infoLogger);

app.use("/categories", categoryRoutes);
app.use("/products", productsRoutes);
app.use("/user", userRoutes);

app.all("*", (req, res, next) => {
  const err = new _Error(`Can't find ${req.originalUrl} on the server!`, 404);
  next(err);
});

app.use(loggingMiddleware.errorLogger);

app.use(errorHandlingMiddleware);

export default app;
