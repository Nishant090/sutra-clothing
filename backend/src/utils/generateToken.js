import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";

export const generateAccessToken = async (userId) => {
   return jwt.sign(
    {
      id: userId,
    },
    env.jwtSecret,
    { expiresIn: "15m" },
  );
};


export const generateRefreshToken = async (userId) => {
   return jwt.sign(
    {
      id: userId,
    },
    env.jwtSecret,
    { expiresIn: "7d" },
  );
};

