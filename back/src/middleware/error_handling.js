import { mainLogger as ml } from "#src/utils/loggers.js"; // Adjust the path as needed

export const errorHandlingMiddleware = (error, req, res, next) => {
  ml.error(error.stack);

  const resError = {
    statusCode: error.statusCode || 500,
    status: error.status || "error",
    message: isOperational
      ? error.message
      : "Something went wrong! Please try again later.",
  };

  if (process.env.NODE_ENV !== "production") {
    resError.stack = error.stack;
    resError.error = error;
  }

  res.status(resError.statusCode).json(resError);
};
