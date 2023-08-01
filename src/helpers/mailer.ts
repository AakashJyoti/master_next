import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

type User = {
  email: string;
  emailType: "RESET" | "VERIFY";
  userId: string;
};

export const sendEmail = async ({ email, emailType, userId }: User) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: "dev.aakashjyoti@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email." : "Reset your password.",
      html: `<p>Click 
        <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "createNewPassword"
      }?token=${hashedToken}">here</a>
        to ${
          emailType === "VERIFY" ? "Verify your email." : "Reset your password."
        }
        or copy paste the link in browser.
        <br>${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "createNewPassword"
      }?token=${hashedToken}</br>
      </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// http://localhost:3000/verifyemail?token=$2a$10$eZlX3c59phHAl0ygVR1O2epklPEggitWwcUVMqjw/He.SIKxr6LY.
