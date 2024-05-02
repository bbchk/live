import dotenv from "dotenv";
dotenv.config();
// require('dotenv').config({ path: './config/.env' })

import mongoose from "mongoose";
import { mainLogger as ml } from "./utils/loggers.js";
import { cleanup } from "./utils/server_cleanup.js";

const ERROR_EXIT_CODE = 1;

process.on("uncaughtException", (err) => {
  ml.error(`UncaughtException occured. ${err.message}`);
  process.exit(ERROR_EXIT_CODE);
});

import app from "./app.js";
const server = app.listen(process.env.PORT, () => {
  ml.info(`Server is listening on port ${process.env.PORT}`);
});

const cleanupSignals = ["SIGINT", "SIGTERM", "SIGTSTP", "SIGQUIT"];
cleanupSignals.forEach((signal) => {
  process.on(signal, () => {
    ml.info(`Received ${signal}`);
    cleanup(server);
  });
});

process.on("unhandledRejection", (err) => {
  ml.error(err.message);
  cleanup(server, ERROR_EXIT_CODE);
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    ml.info(`Connected to MongoDB Successfully`);
  })
  .catch(async (err) => {
    //? why is it important to explicitly do: await mongoose.connection.close();
    ml.error(err.message);
    //todo try to connect again after timeout
    await cleanup(server, ERROR_EXIT_CODE);
  });
