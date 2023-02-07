import TestAccount from "nodemailer";
import { SMTP_CONFIG } from "../Settings/Smtp";

const transporter = TestAccount.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: false,
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
} as any);

export const sendMail = async (message: string, to: string[], html: string) => {
  const mailSent = await transporter.sendMail({
    subject: "NodeJS - Called",
    text: `${message}`,
    from: "Called <patrick.anjos@bagaggio.com.br>",
    to: to,
    html: html
  });
  return mailSent;
};
