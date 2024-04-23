import express from "express";
import cors from "cors";

import { productsRoutes } from "./routes/product.routes.js";
import { categoryRoutes } from "./routes/category.routes.js";
import { userRoutes } from "./routes/user.routes.js";

import { logger } from "#src/middleware/logger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(logger);

app.use("/categories", categoryRoutes);
app.use("/products", productsRoutes);
app.use("/user", userRoutes);

export default app;
