import "server-only";
import type { LeadRequest } from "@shared/contracts";
import { buildMiniGuideEmail } from "@shared/emails/mini-guide";
import { sendSmtpMail, smtpConfigured } from "@/lib/mailer";
import { site } from "@/lib/site";

/**
 * Entrega da amostra grátis, sem precisar de automação no painel do Brevo:
 * 1. salva o contato na lista do Brevo (se BREVO_API_KEY e BREVO_LIST_ID existirem);
 * 2. envia o e-mail com o link do PDF: por SMTP (Mailgun) se SMTP_HOST existir,
 *    senão pela API transacional do Brevo.
 */

const API = "https://api.brevo.com/v3";
const API_KEY = process.env.BREVO_API_KEY;
const LIST_ID = Number(process.env.BREVO_LIST_ID) || null;
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL;
const SENDER_NAME = process.env.BREVO_SENDER_NAME || site.authorName;

const brevoEmailConfigured = Boolean(API_KEY && SENDER_EMAIL);

/** Há algum jeito de entregar o e-mail (SMTP ou API do Brevo)? */
export const miniGuideDeliveryConfigured = smtpConfigured || brevoEmailConfigured;

async function brevo(path: string, body: unknown) {
  const response = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "api-key": API_KEY!, "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Brevo ${path} respondeu ${response.status}: ${detail.slice(0, 300)}`);
  }
}

export async function sendMiniGuide(lead: LeadRequest) {
  if (API_KEY && LIST_ID) {
    // updateEnabled: se o e-mail já existir, atualiza em vez de dar erro.
    await brevo("/contacts", {
      email: lead.email,
      attributes: { FIRSTNAME: lead.name },
      listIds: [LIST_ID],
      updateEnabled: true,
    });
  }

  const email = buildMiniGuideEmail({
    name: lead.name,
    downloadUrl: process.env.MINI_GUIDE_URL || `${site.url}/mini-guia.pdf`,
    salesPageUrl: site.url,
    instagramHandle: site.social.instagram,
  });

  if (smtpConfigured) {
    await sendSmtpMail({ to: lead.email, toName: lead.name, subject: email.subject, html: email.html, text: email.text });
    return;
  }

  await brevo("/smtp/email", {
    sender: { email: SENDER_EMAIL, name: SENDER_NAME },
    to: [{ email: lead.email, name: lead.name }],
    subject: email.subject,
    htmlContent: email.html,
    textContent: email.text,
    tags: ["mini-guia"],
  });
}
