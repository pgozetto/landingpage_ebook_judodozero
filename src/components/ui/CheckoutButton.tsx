"use client";

import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { track, withUtm } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Props = {
  /** Onde o botão está (hero, oferta...). Vai para o evento de rastreamento. */
  location: string;
  label?: string;
  variant?: "red" | "white";
  size?: "md" | "lg";
  className?: string;
  fullWidth?: boolean;
};

const FALLBACK = "#oferta";

export function CheckoutButton({
  location,
  label = "Quero meu ebook",
  variant = "red",
  size = "md",
  className,
  fullWidth,
}: Props) {
  // Sem link de checkout configurado, o botão rola até a oferta.
  const href = site.checkoutUrl || FALLBACK;
  const isCheckout = href !== FALLBACK;

  // As UTMs entram no link no momento do toque/clique, antes da navegação.
  const applyUtm = (event: React.SyntheticEvent<HTMLAnchorElement>) => {
    if (isCheckout) event.currentTarget.href = withUtm(site.checkoutUrl);
  };

  return (
    <a
      href={href}
      onPointerDown={applyUtm}
      onClick={(event) => {
        applyUtm(event);
        track({ name: "cta_click", params: { location } });
        if (isCheckout) track({ name: "initiate_checkout", params: { location, value: site.price.current } });
      }}
      className={cn(
        "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold",
        "transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        "focus-visible:outline-2 focus-visible:outline-offset-4",
        variant === "red" &&
          "bg-judo-red text-white text-shadow-soft shadow-soft hover:bg-judo-red-deep focus-visible:outline-judo-red",
        variant === "white" &&
          "bg-white text-judo-red text-shadow-none shadow-[0_18px_40px_-18px_rgb(0_0_0/0.45)] hover:bg-judo-red-soft focus-visible:outline-white",
        size === "md" && "h-12 px-6 text-base",
        size === "lg" && "h-14 px-8 text-lg",
        fullWidth && "w-full",
        className,
      )}
    >
      {label}
      <ArrowRight
        weight="bold"
        aria-hidden
        className="size-5 transition-transform duration-300 group-hover:translate-x-1"
      />
    </a>
  );
}
