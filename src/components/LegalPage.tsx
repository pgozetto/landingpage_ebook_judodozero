import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/sections/Footer";
import { Logo } from "@/components/ui/Logo";

/** Layout simples para Termos, Privacidade e Contato. */
export function LegalPage({ title, updatedAt, children }: { title: string; updatedAt?: string; children: ReactNode }) {
  return (
    <>
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-4 sm:px-6">
          <Link href="/" aria-label="Judô do Zero, página inicial">
            <Logo />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
        {updatedAt ? <p className="mt-2 text-sm text-ink-soft">Última atualização: {updatedAt}</p> : null}
        <div className="mt-10 space-y-5 leading-relaxed text-ink-soft [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_a]:font-semibold [&_a]:text-judo-red [&_a]:underline">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
