import "server-only";
import { createHash } from "node:crypto";
import { site } from "@/lib/site";

/**
 * Meta API de Conversões (envio de eventos pelo servidor).
 * Complementa o pixel do navegador: funciona mesmo com bloqueador de anúncios e no iOS.
 * O mesmo `eventId` é usado no pixel e aqui, e a Meta descarta o duplicado (deduplicação).
 */

const TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const GRAPH_VERSION = process.env.META_GRAPH_VERSION || "v24.0";
/** Código de teste do Gerenciador de Eventos (aba "Testar eventos"). Deixe vazio em produção. */
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

export const metaCapiConfigured = Boolean(TOKEN && site.metaPixelId);

/** A Meta exige e-mail e nome normalizados (minúsculas, sem espaços) e criptografados com SHA-256. */
function hash(value: string | undefined) {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  return normalized ? [createHash("sha256").update(normalized).digest("hex")] : undefined;
}

function cookie(header: string | null, name: string) {
  return header?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`))?.[1];
}

export interface MetaServerEvent {
  eventName: "Lead" | "InitiateCheckout" | "Purchase";
  eventId?: string;
  request: Request;
  email?: string;
  firstName?: string;
  customData?: Record<string, unknown>;
}

export async function sendMetaEvent({ eventName, eventId, request, email, firstName, customData }: MetaServerEvent) {
  if (!metaCapiConfigured) return;

  const headers = request.headers;
  const cookies = headers.get("cookie");
  const userData = {
    em: hash(email),
    fn: hash(firstName?.split(/\s+/)[0]),
    client_ip_address: headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
    client_user_agent: headers.get("user-agent") || undefined,
    fbp: cookie(cookies, "_fbp"),
    fbc: cookie(cookies, "_fbc"),
  };

  const body = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: headers.get("referer") || site.url,
        user_data: userData,
        custom_data: customData,
      },
    ],
    ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${site.metaPixelId}/events?access_token=${TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      },
    );
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`[meta-capi] ${eventName} recusado (${response.status}): ${detail.slice(0, 300)}`);
    }
  } catch (error) {
    // Rastreamento nunca pode quebrar o fluxo do usuário.
    console.error(`[meta-capi] falha ao enviar ${eventName}:`, error);
  }
}
