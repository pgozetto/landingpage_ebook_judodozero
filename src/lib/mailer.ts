import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

/**
 * Envio de e-mail por SMTP (ex.: Mailgun). Usado quando SMTP_HOST está configurado.
 * Porta 587 usa STARTTLS (a conexão começa sem TLS e é obrigada a subir para TLS).
 */

const HOST = process.env.SMTP_HOST;
const PORT = Number(process.env.SMTP_PORT) || 587;
const USER = process.env.SMTP_USER;
const PASS = process.env.SMTP_PASS;
const FROM = process.env.SMTP_FROM;
const FROM_NAME = process.env.BREVO_SENDER_NAME || "Pedro Gozetto";

export const smtpConfigured = Boolean(HOST && USER && PASS && FROM);

let transporter: Transporter | null = null;

function getTransporter() {
  transporter ??= nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: PORT === 465, // 465 = TLS direto; 587 = STARTTLS
    requireTLS: PORT !== 465,
    auth: { user: USER, pass: PASS },
    connectionTimeout: 10_000,
  });
  return transporter;
}

export async function sendSmtpMail(message: { to: string; toName?: string; subject: string; html: string; text: string }) {
  await getTransporter().sendMail({
    from: { name: FROM_NAME, address: FROM! },
    to: message.toName ? { name: message.toName, address: message.to } : message.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });
}
