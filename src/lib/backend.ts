import "server-only";
import { API_VERSION } from "@shared/contracts";

/**
 * Cliente do backend Node.js + Express (servidor -> servidor).
 *
 * O navegador nunca fala direto com o Express: ele chama as rotas /api/* do Next,
 * que repassam para `${BACKEND_API_URL}/v1/...` com a chave secreta.
 * Assim a URL e a chave do backend não ficam expostas e o CORS não é necessário.
 */

const BASE_URL = process.env.BACKEND_API_URL?.replace(/\/$/, "");
const API_KEY = process.env.BACKEND_API_KEY;

export const backendConfigured = Boolean(BASE_URL);

export class BackendError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown,
  ) {
    super(message);
  }
}

export async function backendFetch<T>(
  path: `/${string}`,
  init: { method?: "GET" | "POST"; body?: unknown; headers?: Record<string, string>; timeoutMs?: number } = {},
): Promise<T> {
  if (!BASE_URL) throw new BackendError("BACKEND_API_URL não configurada", 503);

  const response = await fetch(`${BASE_URL}/${API_VERSION}${path}`, {
    method: init.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(API_KEY ? { "x-api-key": API_KEY } : {}),
      ...init.headers,
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    signal: AbortSignal.timeout(init.timeoutMs ?? 8000),
    cache: "no-store",
  });

  const data = await response.json().catch(() => undefined);
  if (!response.ok) throw new BackendError(`Backend respondeu ${response.status}`, response.status, data);
  return data as T;
}
