import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import { productsRoutes } from "./routes/product.js";
import { categoryRoutes } from "./routes/category.js";
import { userRoutes } from "./routes/user.js";

const app = express();
console.log(process.env.PORT);

app.use(cors());
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/products", productsRoutes);
app.use("/user", userRoutes);

export default app;
