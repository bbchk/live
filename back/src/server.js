import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";
import { mainLogger as ml } from "./utils/loggers.js";
import { cleanup } from "./utils/server_cleanup.js";

mongoose.connect(process.env.MONGODB_URI).then(() => {
  ml.info(`Connected to MongoDB Successfully`);
});

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

  const ERROR_EXIT_CODE = 1;
  cleanup(server, ERROR_EXIT_CODE);
});
