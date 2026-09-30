import { configDotenv } from "dotenv";
configDotenv()

export const env = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  emailUser: process.env.SMTP_USER,
  emailPass: process.env.SMTP_PASS,
};