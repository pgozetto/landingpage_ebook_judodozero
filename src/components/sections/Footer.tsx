import Link from "next/link";
import { InstagramLogo, TiktokLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/ui/Logo";
import { site, socialUrl } from "@/lib/site";

export function Footer() {
  const instagram = socialUrl("instagram");
  const tiktok = socialUrl("tiktok");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-judo-wine pb-28 pt-14 text-white/80 md:pb-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-5">
            <Logo tone="white" />
            {instagram ? (
              <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">
                <InstagramLogo weight="bold" className="size-6" />
              </a>
            ) : null}
            {tiktok ? (
              <a href={tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-white">
                <TiktokLogo weight="bold" className="size-6" />
              </a>
            ) : null}
          </div>
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
              <li>
                <Link href="/termos" className="hover:text-white">Termos de uso</Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-white">Política de privacidade</Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white">Contato</Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mx-auto mt-10 max-w-[80ch] text-center text-sm leading-relaxed text-white/60">
          Este material tem fins educativos e não substitui o acompanhamento de um professor qualificado. Consulte um
          médico antes de iniciar qualquer atividade física. Os resultados variam de pessoa para pessoa.
        </p>
        <p className="mt-4 text-center text-sm text-white/60">
          © {year} {site.authorName}. Todos os direitos reservados.
          {site.legalId ? ` CNPJ/CPF: ${site.legalId}` : ""}
        </p>
      </div>
    </footer>
  );
}
