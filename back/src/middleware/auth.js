import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { asyncErrorHandler } from "#src/utils/async_error_handler.js";

export const requireAuth = asyncErrorHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    //make it throw an error
    return res
      .status(400)
      .json({ error: "Access denied. Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const secretKey = process.env.JWT_SECRET;
    const { _id } = jwt.verify(token, secretKey);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    //make it throw an error
    next(error);
  }
});

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.isAdmin) {
    next();
  } else {
    res
      .status(403)
      .json({ error: "Access denied. Admin rights are not confirmed" });
  }
};
