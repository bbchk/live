import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { asyncErrorHandler } from "#src/utils/async_error_handler.js";
import _Error from "#src/utils/error.js";
import { mainLogger as ml } from "#src/utils/loggers.js";

export const requireAuth = asyncErrorHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    next(new _Error("Access denied. Authorization required", 400));

  const token = authorization.split(" ")[1];

  const secretKey =
    process.env.NODE_ENV === "test"
      ? process.env.TEST_JWT_SECRET
      : process.env.JWT_SECRET;
  let id;
  try {
    const { _id } = jwt.verify(token, secretKey);
    id = _id;
  } catch (err) {
    next(new _Error("Invalid token. Please log in again", 401));
  }

  const user = await User.findOne({ _id: id }).select("_id").exec();
  if (!user) next(new _Error("User with such token is not found", 401));

  req.user = user;
  next();
});

export const isAdmin = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user.isAdmin)
    next(new _Error("Access denied. Admin rights are not confirmed", 403));

  next();
});
