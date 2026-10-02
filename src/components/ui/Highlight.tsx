import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Destaque de texto só por cor: vermelho em fundos claros, branco em fundos vermelhos. */
export function Highlight({ children, tone = "red" }: { children: ReactNode; tone?: "red" | "light" }) {
  return (
    <span className={cn("whitespace-nowrap", tone === "red" ? "text-judo-red" : "text-white")}>{children}</span>
  );
}
