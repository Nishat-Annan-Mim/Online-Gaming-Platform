import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// console.log("SMTP user:", process.env.SMTP_MAIL);
// console.log("SMTP pass:", process.env.SMTP_PASSWORD);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error in sendEmail controller:", error.message);
    res.status(500).json({ error: "Failed to send email" });
  }
};
