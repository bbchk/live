import { mainLogger as ml } from "#src/utils/loggers.js"; // Adjust the path as needed

export const errorHandlingMiddleware = (error, req, res, next) => {
  ml.error(error.stack);

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
