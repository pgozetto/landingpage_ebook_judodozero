import { NextResponse } from "next/server";
import { validateLead, type ApiError, type LeadResponse } from "@shared/contracts";
import { BackendError, backendConfigured, backendFetch } from "@/lib/backend";
import { miniGuideDeliveryConfigured, sendMiniGuide } from "@/lib/brevo";

/**
 * POST /api/leads
 * Recebe o formulário do mini guia e valida. Depois, por ordem de prioridade:
 * 1. Brevo e/ou SMTP configurados: salva o contato e envia o e-mail com a amostra grátis;
 * 2. Express configurado: repassa para POST /v1/leads;
 * 3. nenhum dos dois: em desenvolvimento o lead só aparece no terminal.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = validateLead(body);

  if (!result.ok) {
    return NextResponse.json<ApiError>(
      { ok: false, code: "VALIDATION_ERROR", message: "Confira os campos.", fields: result.fields },
      { status: 422 },
    );
  }

  // Brevo salva o contato; Mailgun (SMTP) ou Brevo envia o e-mail com a amostra na hora.
  if (miniGuideDeliveryConfigured) {
    try {
      await sendMiniGuide(result.data);
      return NextResponse.json<LeadResponse>({ ok: true });
    } catch (error) {
      console.error("[leads] falha ao salvar ou enviar a amostra:", error);
      return NextResponse.json<ApiError>(
        { ok: false, code: "INTERNAL_ERROR", message: "Não foi possível enviar agora. Tente de novo em instantes." },
        { status: 502 },
      );
    }
  }

  if (!backendConfigured) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[leads] backend ainda não configurado. Lead recebido:", result.data);
      return NextResponse.json<LeadResponse>({ ok: true, id: "dev-mock" });
    }
    console.error("[leads] BACKEND_API_URL ausente em produção. Lead perdido:", result.data.email);
    return NextResponse.json<ApiError>(
      { ok: false, code: "BACKEND_UNAVAILABLE", message: "Não foi possível enviar agora. Tente de novo em instantes." },
      { status: 503 },
    );
  }

  try {
    const data = await backendFetch<LeadResponse>("/leads", {
      method: "POST",
      body: result.data,
      headers: { "x-forwarded-for": request.headers.get("x-forwarded-for") ?? "" },
    });
    return NextResponse.json<LeadResponse>(data);
  } catch (error) {
    const status = error instanceof BackendError ? error.status : 500;
    console.error("[leads] falha ao enviar para o backend:", error);
    return NextResponse.json<ApiError>(
      {
        ok: false,
        code: status === 429 ? "RATE_LIMITED" : "INTERNAL_ERROR",
        message: "Não foi possível enviar agora. Tente de novo em instantes.",
      },
      { status: status === 429 ? 429 : 502 },
    );
  }
}
