import { mainLogger as ml } from "#src/utils/loggers.js";

export function cleanup(server) {
  server.close(function (err) {
    if (err) {
      ml.error(err.message);
      process.exit(1);
    }
    process.exit(0);
  });
}
