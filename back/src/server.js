import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";
import { mainLogger as ml } from "./utils/loggers.js";

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

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("SIGTSTP", cleanup);

function cleanup() {
  server.close(function (err) {
    if (err) {
      ml.error(err.message);
      process.exit(1);
    }
    process.exit(0);
  });
}
