import _Error from '#src/utils/error.js';
import { mainLogger as ml } from '#src/utils/loggers.js'; // Adjust the path as needed

const DUPLICATE_FIELD_ERROR = 11000;
export const errorHandlingMiddleware = (error, req, res, next) => {
  ml.error(error.stack);

  const resError = {
    statusCode: error.statusCode || 500,
    status: error.status || 'error',
  };

  if (process.env.NODE_ENV === 'production') {
    let e = { ...error, name: error.name };

    if (!e.isOperational) {
      switch (e.name) {
        case 'CastError':
          e = new _Error(`Invalid value for ${error.path}: ${error.path}`, 400);
          break;
        case 'ValidationError':
          const errors = Object.values(error.errors).map((el) => el.message);
          e = new _Error(`Invalid input data. ${errors.join('. ')}`, 400);
          break;
        case 'JsonWebTokenError':
          e = new _Error('Invalid token. Please log in again', 401);
          break;
      }

      switch (e.code) {
        case DUPLICATE_FIELD_ERROR:
          e = new _Error(
            `Duplicate field value: ${Object.keys(error.keyValue)}: ${
              Object.values(error.keyValue)[0]
            }`,
            400,
          );
          break;
      }
    }

    const GENERIC_ERROR_MESSAGE =
      'Something went wrong! Please try again later.';
    resError.message = e.isOperational ? e.message : GENERIC_ERROR_MESSAGE;

    resError.statusCode = e.statusCode || resError.statusCode;
  } else {
    resError.stack = error.stack;
    resError.error = error;
    resError.message = error.message;
  }

  res.status(resError.statusCode).json(resError);
};
