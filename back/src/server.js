import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";
import { mainLogger as ml } from "./utils/loggers.js";
import { cleanup } from "./utils/server_cleanup.js";

let server;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server = app.listen(process.env.PORT, () => {
      ml.info(`listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    ml.error(err.message);
  });

const cleanupSignals = ["SIGINT", "SIGTERM", "SIGTSTP"];
process.on(cleanupSignals, () => cleanup(server));
