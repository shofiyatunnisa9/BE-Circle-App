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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #22c55e; text-align: center; margin-bottom: 30px; font-size: 32px;">Circle</h1>
          
          <h2 style="color: #333; margin-bottom: 20px;">Permintaan Reset Password</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Kami menerima permintaan untuk mereset password akun Circle Anda. 
            Jika Anda tidak melakukan permintaan ini, Anda dapat mengabaikan email ini dengan aman.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #22c55e; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 5px; font-weight: bold;
                      display: inline-block; font-size: 16px;">
              Reset Password Anda
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Atau salin dan tempel link ini ke browser Anda:
          </p>
          
          <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; 
                     word-break: break-all; color: #333; font-size: 14px;">
            ${resetLink}
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 14px; margin-bottom: 10px;">
              <strong>Penting:</strong> Link ini akan kadaluarsa dalam 15 menit untuk alasan keamanan.
            </p>
            <p style="color: #999; font-size: 14px;">
              Jika Anda memiliki pertanyaan, silakan hubungi tim dukungan kami.
            </p>
          </div>
        </div>
      </div>`,
  });
};
