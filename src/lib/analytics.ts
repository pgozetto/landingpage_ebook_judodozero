"use client";

import { UTM_KEYS, type UtmKey } from "@shared/contracts";

/**
 * Eventos do funil. Cada um é enviado para GA4, Meta Pixel e TikTok Pixel
 * (apenas os que estiverem configurados no .env).
 */
export type FunnelEvent =
  | { name: "cta_click"; params: { location: string } }
  | { name: "initiate_checkout"; params: { location: string; value: number } }
  | { name: "lead"; params: { source: string } }
  | { name: "purchase_thank_you"; params?: undefined };

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;
type Ttq = { track: (event: string, params?: Record<string, unknown>) => void };

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
    ttq?: Ttq;
  }
}

const META_MAP: Partial<Record<FunnelEvent["name"], string>> = {
  initiate_checkout: "InitiateCheckout",
  lead: "Lead",
};

const TIKTOK_MAP: Partial<Record<FunnelEvent["name"], string>> = {
  initiate_checkout: "InitiateCheckout",
  lead: "SubmitForm",
  cta_click: "ClickButton",
};

export function track(event: FunnelEvent) {
  if (typeof window === "undefined") return;
  const params = (event.params ?? {}) as Record<string, unknown>;
  const withCurrency = "value" in params ? { ...params, currency: "BRL" } : params;

  try {
    window.gtag?.("event", event.name, withCurrency);

    const metaName = META_MAP[event.name];
    if (metaName) window.fbq?.("track", metaName, withCurrency);
    else window.fbq?.("trackCustom", event.name, withCurrency);

    const ttName = TIKTOK_MAP[event.name];
    if (ttName) window.ttq?.track(ttName, withCurrency);
  } catch {
    // Rastreamento nunca pode quebrar a página.
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[track]", event.name, withCurrency);
  }
}

const UTM_STORAGE_KEY = "jdz_utm";

/** Guarda as UTMs da primeira visita para repassar ao checkout e ao formulário. */
export function captureUtm(): Partial<Record<UtmKey, string>> {
  if (typeof window === "undefined") return {};
  const fromUrl: Partial<Record<UtmKey, string>> = {};
  const search = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const value = search.get(key);
    if (value) fromUrl[key] = value;
  }
  try {
    if (Object.keys(fromUrl).length > 0) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return fromUrl;
  }
}

/** Monta o link do checkout preservando as UTMs (Hotmart, Kiwify e Eduzz aceitam utm_* na URL). */
export function withUtm(url: string) {
  const utm = captureUtm();
  if (!url || Object.keys(utm).length === 0) return url;
  try {
    const target = new URL(url);
    for (const [key, value] of Object.entries(utm)) {
      if (value && !target.searchParams.has(key)) target.searchParams.set(key, value);
    }
    return target.toString();
  } catch {
    return url;
  }
}
