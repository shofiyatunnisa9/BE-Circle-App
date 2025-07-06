import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sentReset = async (to: string, resetLink: string) => {
  await transporter.sendMail({
    from: `"Circle App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset your password",
    html: `
        <p>Request to reset your password</p>
        <p>Click link to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expired in 15 minutes</p>`,
  });
};
