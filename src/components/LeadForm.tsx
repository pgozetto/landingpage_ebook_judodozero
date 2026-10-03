"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle, CircleNotch, WarningCircle } from "@phosphor-icons/react";
import { validateLead, type ApiError, type LeadResponse, type LeadSource } from "@shared/contracts";
import { captureUtm, track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = NonNullable<ApiError["fields"]>;

export function LeadForm({ source = "mini-guia" }: { source?: LeadSource }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      source,
      utm: captureUtm(),
      consent: true,
    };

    const check = validateLead(payload);
    if (!check.ok) {
      setErrors(check.fields);
      return;
    }

    setErrors({});
    setStatus("loading");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(check.data),
      });
      const data = (await response.json()) as LeadResponse | ApiError;
      if (!data.ok) {
        setErrors(data.fields ?? {});
        setMessage(data.message);
        setStatus("error");
        return;
      }
      track({ name: "lead", params: { source } });
      setStatus("success");
    } catch {
      setMessage("Sem conexão no momento. Confira a internet e tente de novo.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex gap-3 rounded-2xl bg-judo-red-soft p-6 text-judo-wine">
        <CheckCircle aria-hidden weight="fill" className="size-7 shrink-0 text-judo-red" />
        <p className="text-lg font-semibold leading-snug">
          Pronto! Enviei a amostra grátis para o seu e-mail. Confira também a caixa de promoções e o spam.
        </p>
      </div>
    );
  }

  const fieldClass = (invalid: boolean) =>
    cn(
      "h-13 w-full rounded-xl border bg-white px-4 text-base text-ink placeholder:text-zinc-500",
      "outline-none transition focus:border-judo-red focus:ring-4 focus:ring-judo-red/15",
      invalid ? "border-judo-red" : "border-zinc-300",
    );

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-name`} className="text-sm font-semibold">
          Nome
        </label>
        <input
          id={`${id}-name`}
          name="name"
          autoComplete="given-name"
          placeholder="Como você gosta de ser chamado"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
          className={fieldClass(Boolean(errors.name))}
        />
        {errors.name ? (
          <p id={`${id}-name-error`} className="text-sm font-medium text-judo-red-deep">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-email`} className="text-sm font-semibold">
          E-mail
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="voce@email.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
          className={fieldClass(Boolean(errors.email))}
        />
        {errors.email ? (
          <p id={`${id}-email-error`} className="text-sm font-medium text-judo-red-deep">
            {errors.email}
          </p>
        ) : null}
      </div>

      {status === "error" && message ? (
        <p role="alert" className="flex items-center gap-2 rounded-xl bg-judo-red-soft p-3 text-sm font-medium text-judo-wine">
          <WarningCircle aria-hidden weight="fill" className="size-5 shrink-0" />
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-judo-red text-shadow-soft px-8 text-lg font-semibold text-white shadow-soft transition hover:bg-judo-red-deep active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
      >
        {status === "loading" ? (
          <>
            <CircleNotch aria-hidden weight="bold" className="size-5 animate-spin" /> Enviando...
          </>
        ) : (
          "Quero a amostra grátis"
        )}
      </button>
      <p className="text-center text-sm text-ink-soft">Sem spam. Você pode sair da lista quando quiser.</p>
    </form>
  );
}
