/**
 * Contratos compartilhados entre o front (Next.js) e o backend (Node.js + Express).
 *
 * Esta pasta não depende de Next nem de React: o backend Express pode importar
 * estes tipos e validadores diretamente (ou copiar a pasta `shared/`).
 * Veja docs/BACKEND.md para a especificação completa dos endpoints.
 */

export const API_VERSION = "v1";

/* ------------------------------------------------------------------ */
/* Leads (página de captura do mini guia)                              */
/* ------------------------------------------------------------------ */

export type LeadSource = "mini-guia" | "pagina-de-vendas";

export interface LeadRequest {
  name: string;
  email: string;
  source: LeadSource;
  /** Parâmetros de campanha capturados da URL (utm_source, utm_medium...). */
  utm?: Partial<Record<UtmKey, string>>;
  /** Consentimento LGPD para receber e-mails. */
  consent: true;
}

export interface LeadResponse {
  ok: true;
  id?: string;
}

export interface ApiError {
  ok: false;
  code: "VALIDATION_ERROR" | "BACKEND_UNAVAILABLE" | "RATE_LIMITED" | "INTERNAL_ERROR";
  message: string;
  fields?: Partial<Record<keyof LeadRequest, string>>;
}

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
export type UtmKey = (typeof UTM_KEYS)[number];

/** Mensagens de erro de formulário (banco de microtextos da copy). */
export const FORM_ERRORS = {
  name: "Preencha o seu nome para continuarmos.",
  email: "Digite um e-mail válido, por favor.",
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validação usada no navegador, na rota do Next e (futuramente) no Express. */
export function validateLead(input: unknown):
  | { ok: true; data: LeadRequest }
  | { ok: false; fields: NonNullable<ApiError["fields"]> } {
  const body = (input ?? {}) as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const source: LeadSource = body.source === "pagina-de-vendas" ? "pagina-de-vendas" : "mini-guia";

  const fields: NonNullable<ApiError["fields"]> = {};
  if (name.length < 2 || name.length > 80) fields.name = FORM_ERRORS.name;
  if (!EMAIL_RE.test(email) || email.length > 160) fields.email = FORM_ERRORS.email;
  if (Object.keys(fields).length > 0) return { ok: false, fields };

  const utm: LeadRequest["utm"] = {};
  const rawUtm = (body.utm ?? {}) as Record<string, unknown>;
  for (const key of UTM_KEYS) {
    const value = rawUtm[key];
    if (typeof value === "string" && value.length <= 120) utm[key] = value;
  }

  return { ok: true, data: { name, email, source, utm, consent: true } };
}

/* ------------------------------------------------------------------ */
/* Webhook de compra (Hotmart / Kiwify / Eduzz -> Express)             */
/* ------------------------------------------------------------------ */

/** Formato normalizado que o Express deve produzir a partir do webhook da plataforma. */
export interface PurchaseEvent {
  provider: "hotmart" | "kiwify" | "eduzz";
  transactionId: string;
  status: "approved" | "refunded" | "chargeback" | "canceled";
  buyer: { name: string; email: string };
  amountCents: number;
  createdAt: string;
}
