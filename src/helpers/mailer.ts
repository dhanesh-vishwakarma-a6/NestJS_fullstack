import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // setting up the token in user
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verfiedToken: hashedToken,
          verifiedTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordExipry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    }

    // create transpoter
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // mail options
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify your email address"
          : "Reset your password",

      html: `<p>
      click
      <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">
        here
      </a>
      to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
      or copy and paste the link below in your browser.<br /> ${
        process.env.DOMAIN
      }/verifyEmail?token=${hashedToken}
    </p>`,
    };

    const mailResponse = transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
