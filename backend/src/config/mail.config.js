import nodemailer from "nodemailer";
import { env } from "../config/env.config.js";
export const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: env.emailUser,
    pass: env.emailPass,
  },
});
