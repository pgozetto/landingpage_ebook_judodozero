import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { LeadForm } from "@/components/LeadForm";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Mini guia grátis para o seu primeiro treino",
  description:
    "Baixe grátis: checklist do que levar ao dojo, como amarrar a faixa em 5 passos, as 3 quedas básicas e 10 termos essenciais do judô.",
  alternates: { canonical: "/mini-guia" },
};

const perks = [
  "Checklist do que levar ao dojo",
  "Como amarrar a faixa em 5 passos",
  "Introdução às 3 quedas (ukemi)",
  "Glossário com 10 termos essenciais",
];

/** Página 2: captura. Uma única tela, sem menu, só o formulário. */
export default function MiniGuidePage() {
  return (
    <main className="grid min-h-[100dvh] lg:grid-cols-2">
      <section className="bg-judo-gradient relative flex flex-col justify-center overflow-hidden px-4 py-12 text-white sm:px-10 lg:px-16">
        <div aria-hidden className="tatami-lines pointer-events-none absolute inset-0" />
        <div className="relative max-w-xl">
          <Link href="/" aria-label="Judô do Zero, página inicial">
            <Logo tone="white" />
          </Link>
          <p className="mt-10 text-sm font-bold uppercase tracking-[0.16em] text-white/80">
            Presente para faixas brancas
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Mini guia grátis: 5 páginas para o seu primeiro treino
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/85">
            Um resumo rápido com o que levar, como amarrar a faixa e as 3 quedas básicas. Direto no seu e-mail.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {perks.map((perk) => (
              <li key={perk} className="flex gap-2 font-medium leading-snug">
                <CheckCircle aria-hidden weight="fill" className="size-5 shrink-0" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex items-center justify-center bg-paper px-4 py-12 sm:px-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-card ring-1 ring-zinc-200 sm:p-9">
          <h2 className="text-2xl font-extrabold tracking-tight">Para onde eu envio?</h2>
          <p className="mb-7 mt-2 text-ink-soft">Preencha e o guia chega em poucos minutos.</p>
          <LeadForm source="mini-guia" />
        </div>
      </section>
    </main>
  );
}
