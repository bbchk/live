import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { asyncErrorHandler } from "#src/utils/async_error_handler.js";
import _Error from "#src/utils/error.js";

export const requireAuth = asyncErrorHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    next(new _Error("Access denied. Authorization required", 400));

  const token = authorization.split(" ")[1];

  const secretKey = process.env.JWT_SECRET;
  const { _id } = jwt.verify(token, secretKey);

  req.user = await User.findOne({ _id }).select("_id");

  next();
});

export const isAdmin = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user.isAdmin)
    next(new _Error("Access denied. Admin rights are not confirmed", 403));

  next();
});
