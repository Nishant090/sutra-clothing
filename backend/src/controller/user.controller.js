import * as authServices from "../services/user.services.js";
import RefreshToken from "../models/refreshToken.model.js";
import { AppError } from "../utils/appError.js";

export const register = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authServices.register(
      req.body,
    );

    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      Message: "User created succesfully",
      user,
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authServices.login(
      req.body,
    );
    await RefreshToken.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15* 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      Message: "Login Sucessfully",
      user,
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await authServices.verifyEmail(token);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = req.user;

    if(!user){
      throw new AppError("User not authenticated",401)
    }
    console.log(user)
  

  res.status(200).json({
    success: true,
      user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
  });
    
  } catch (error) {
    next(error)
    
  }
  
};

export const refresh = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;

    const { userId, accessToken, refreshToken } =
      await authServices.refresh(token);

    await RefreshToken.create({
      userId,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    };

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Tokens refreshed successfully",
    });
  } catch (err) {
    next(err);
  }
};
export const logout = async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;

  // Use the same cookie options used when setting the tokens.
  const cookieOptions = {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };

  try {
    await authServices.logout(refreshToken);

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    // Clear browser cookies even if token revocation fails.
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    return next(error);
  }
};
