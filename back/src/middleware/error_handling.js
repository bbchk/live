import _Error from "#src/utils/error.js";
import { mainLogger as ml } from "#src/utils/loggers.js"; // Adjust the path as needed

export const errorHandlingMiddleware = (error, req, res, next) => {
  ml.error(error.stack);

  const resError = {
    statusCode: error.statusCode || 500,
    status: error.status || "error",
  };

  if (process.env.NODE_ENV === "production") {
    let e = { ...error };

    switch (error.name) {
      case "CastError":
        e = new _Error(`Invalid value for ${error.path}: ${error.path}`, 400);
        break;
      case "ValidationError":
        //todo
        break;
    }

    const GENERIC_ERROR_MESSAGE =
      "Something went wrong! Please try again later.";
    resError.message = e.isOperational ? e.message : GENERIC_ERROR_MESSAGE;

    resError.statusCode = e.statusCode || resError.statusCode;
  } else {
    resError.stack = error.stack;
    resError.error = error;
    resError.message = error.message;
  }

  res.status(resError.statusCode).json(resError);
};
