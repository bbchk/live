import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";

let server;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server = app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("SIGTSTP", cleanup);

function cleanup() {
  server.close(function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
}
