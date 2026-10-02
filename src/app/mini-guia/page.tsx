import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { LeadForm } from "@/components/LeadForm";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Amostra grátis do ebook",
  description:
    "Leia grátis os primeiros capítulos do Judô do Zero: os 5 erros clássicos de faixa branca, o que levar ao primeiro treino e como amarrar a faixa.",
  alternates: { canonical: "/mini-guia" },
};

/** Conteúdo real da amostra (public/mini-guia.pdf). */
const perks = [
  "Os 5 erros clássicos de faixa branca",
  "O que levar ao primeiro treino",
  "Etiqueta no dojo",
  "Como amarrar a faixa, com vídeo",
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
          <p className="mt-10 text-sm font-bold uppercase tracking-[0.16em] text-white">
            Presente para faixas brancas
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Leia grátis os primeiros capítulos
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-white">
            Veja se o Judô do Zero é do jeito que você gosta de aprender. Direto no seu e-mail.
          </p>
          <ul className="mt-8 grid gap-3 text-lg sm:grid-cols-2">
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
          <p className="mb-7 mt-2 text-ink-soft">Preencha e a amostra chega em poucos minutos.</p>
          <LeadForm source="mini-guia" />
        </div>
      </section>
    </main>
  );
}
