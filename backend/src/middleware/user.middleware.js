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

    const decoded = jwt.verify(token, env.jwtSecretAccess);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError("Not Authorized", 401);
    }

    req.user = user;
    next();
    
  } catch (err) {
   if (err instanceof jwt.TokenExpiredError) {
      return next(new AppError("Access token expired", 401));
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return next(new AppError("Invalid access token", 401));
    }

    return next(err);
  }
};
