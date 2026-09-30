import User from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { sendVerificationMail } from "./mail.services.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { AppError } from "../utils/appError.js";

//@POST /api/vi/auth/register
export const register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new AppError("User already exists", 409);
  }

  const verificationToken = generateVerificationToken();
  const verificationTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
  const hashedPassword = bcrypt.hashSync(password, 12);
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    verificationToken,
    verificationTokenExpiresAt,
    isVerified: false,
  });
  const accessToken = await generateAccessToken(user._id);
  const refreshToken = await generateRefreshToken(user._id);

  await sendVerificationMail(user);

  return { user, accessToken,refreshToken };
};

//@POST /api/vi/auth/login
export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (user.isVerified === false) {
    throw new AppError("Email not verified", 401);
  }

  const isPasswordVlaid = await bcrypt.compare(password, user.password);

  if (!isPasswordVlaid) {
    throw new AppError("Invalid email or password", 401);
  }

  const accessToken = await generateAccessToken(user._id);
  const refreshToken = await generateRefreshToken(user._id);

  return {
    user: {
      id:user._id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

//@POST /api/vi/auth/verify
export const verifyEmail = async (token) => {
  const user = await User.findOne({
    verificationToken: token,
  }).select("+verificationToken +verificationTokenExpiresAt");

  if (!token) {
    throw new AppError("Token is required", 400);
  }

  if (!user) {
    throw new AppError("Invalid Verification token", 401);
  }
  if (Date.now() > user.verificationTokenExpiresAt.getTime()) {
    throw new AppError("Token Expired. Please send new one.", 400);
  }

  user.isVerified = true;
  user.verificationToken = null;
  user.verificationTokenExpiresAt = null;

  await user.save();

  return user;
};


export const refresh = async(userId,token)=>{
     
  if(!token){
    throw new AppError("Refresh token is required",401)
  }

  const storedToken= await RefreshToken.findOne({
    token,
    userId
  })

  if(!storedToken){
    throw new AppError("Invalid refresh token",401)
  }

  if(storedToken.revokedAt){
    throw new AppError("Refresh token has already been revoked",401)
  }


  if(storedToken.expiresAt < new Date()){
    throw new AppError("Refresh token has been expired",401)
  }

  storedToken.revokedAt= new Date()

  await storedToken.save()

  const newAccessToken = await generateAccessToken(userId);
  const newRefeshToken = await generateRefreshToken(userId)

   return{
    accessToken:newAccessToken,
    refresh:newRefeshToken
   }

}