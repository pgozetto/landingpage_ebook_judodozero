import { cn } from "@/lib/cn";

/** Logotipo em texto: JUDÔ DO ZERO, com o "ZERO" sublinhado como uma faixa. */
export function Logo({ tone = "red", className }: { tone?: "red" | "white"; className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-lg font-extrabold tracking-tight",
        tone === "red" ? "text-judo-red" : "text-white",
        className,
      )}
    >
      JUDÔ DO{" "}
      <span className="relative inline-block">
        ZERO
        <span
          aria-hidden
          className={cn(
            "absolute -bottom-0.5 left-0 h-[3px] w-full rounded-full",
            tone === "red" ? "bg-ink" : "bg-white/70",
          )}
        />
      </span>
    </span>
  );
}
