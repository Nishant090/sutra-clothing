import { configDotenv } from "dotenv";
configDotenv();

export const env = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URL,
  jwtSecretAccess: process.env.JWT_SECRET_ACCESS,
  jwtSecretRefresh: process.env.JWT_SECRET_REFRESH,
  emailUser: process.env.SMTP_USER,
  emailPass: process.env.SMTP_PASS,
};
