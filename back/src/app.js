import express from "express";
import cors from "cors";

import { productsRoutes } from "./routes/product.js";
import { categoryRoutes } from "./routes/category.js";
import { userRoutes } from "./routes/user.js";

// import { logger, errorLoggger } from "#src/config/winston_logger.js";

const app = express();

app.use(cors());
app.use(express.json());

// app.use(logger);

app.use("/categories", categoryRoutes);
app.use("/products", productsRoutes);
app.use("/user", userRoutes);

// app.use(errorLogger);

export default app;
