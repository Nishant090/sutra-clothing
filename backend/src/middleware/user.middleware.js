import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import { env } from "../config/env.config.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new AppError("Not Authorized", 401);
    }

    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError("Not Authorized", 401);
    }

    req.user = user;
    next();
    
  } catch (err) {
    next(err);
  }
};
