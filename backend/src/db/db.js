import mongoose from "mongoose";
import { env } from "../config/env.config.js";


const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Failed to connect to database");
    process.exit(1);
  }
};

export default connectDB;
