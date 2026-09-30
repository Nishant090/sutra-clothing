import { transport } from "../config/mail.config.js";
import { verificationEmail } from "../templates/verificationEmail.js";

export const sendVerificationMail = async (user) => {
  const verificationUrl = `http://localhost:3000/verifyemail/${user.verificationToken}`;

 transport.sendMail(
    {
      from: "Nishant@gamil.compare",
      to: user.email,
      subject: "Verify Email",
      html: await verificationEmail(user.name, verificationUrl),
    },
    (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    },
  );
};
