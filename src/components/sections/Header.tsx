import Link from "next/link";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Logo } from "@/components/ui/Logo";
import { formatPrice, site } from "@/lib/site";

const links = [
  { href: "#conteudo", label: "O que tem dentro" },
  { href: "#videos", label: "Vídeos" },
  { href: "#autor", label: "Autor" },
  { href: "#perguntas", label: "Perguntas" },
];

/** Barra de aviso (40px) + navbar branca, ambas fixas no topo. */
export function Header() {
  return (
    <header className="sticky top-0 z-40">
      <a
        href="#oferta"
        className="flex h-10 items-center justify-center gap-2 bg-judo-red px-4 text-center text-[13px] font-medium text-white sm:text-sm"
      >
        <span className="truncate">
          <span className="hidden sm:inline">Preço de lançamento por tempo limitado: </span>
          Judô do Zero por {formatPrice(site.price.current)}
        </span>
        <span className="shrink-0 font-bold underline decoration-white/60 underline-offset-4">Quero o meu</span>
      </a>

      <nav
        aria-label="Principal"
        className="border-b border-zinc-200/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
          <Link href="/" aria-label="Judô do Zero, início">
            <Logo />
          </Link>
          <ul className="hidden items-center gap-7 text-[15px] font-medium text-ink-soft lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-judo-red">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <CheckoutButton location="navbar" className="h-10 px-4 text-sm sm:px-5" />
        </div>
      </nav>
    </header>
  );
}
