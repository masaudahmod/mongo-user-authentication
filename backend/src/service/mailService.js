import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "ahmedmasaud942@gmail.com",
    pass: "bofh lvbp vcot zvpn",
  },
});

export async function sendMail(to, subject, text="", html="") {
  try {
    const info = await transporter.sendMail({
      from: 'Mern 2308 <ahmedmasaud942@gmail.com>',
      to,
      subject,
      text,
      html
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}
