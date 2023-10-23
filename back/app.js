const express = require("express");
const cors = require("cors");

const app = express();
const productsRoutes = require("./routes/product");
const userRoutes = require("./routes/user");

// app.use(express.json({ limit: "300mb" }));

app.use(cors());
app.use(express.json());

app.use("/products", productsRoutes);
app.use("/user", userRoutes);

module.exports = app;
