import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Mockup 3D do ebook com a capa real (public/ebook/capa.webp, gerada a partir do PDF).
 * A capa é vermelha: a borda clara e a sombra escura separam o livro dos fundos vermelhos da página.
 */
export function EbookCover({
  className,
  size = "lg",
  priority = false,
}: {
  className?: string;
  size?: "sm" | "lg";
  priority?: boolean;
}) {
  const sm = size === "sm";
  return (
    <div className={cn("relative [perspective:1600px]", className)}>
      <div
        className={cn(
          "relative [transform-style:preserve-3d] [transform:rotateY(-18deg)_rotateX(4deg)]",
          sm ? "w-36" : "w-56 sm:w-64 lg:w-72",
        )}
      >
        {/* Lombada */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-5 origin-left bg-judo-wine [transform:rotateY(90deg)_translateZ(0)]"
        />
        {/* Páginas */}
        <div
          aria-hidden
          className="absolute inset-y-1 -right-2 w-3 rounded-r-sm bg-[repeating-linear-gradient(90deg,#fff_0,#fff_2px,#e4e4e7_2px,#e4e4e7_3px)]"
        />
        <div className="relative aspect-[420/595] overflow-hidden rounded-r-xl rounded-l-sm bg-judo-red shadow-[24px_30px_60px_-18px_rgb(30_0_6/0.7)] ring-1 ring-white/40">
          <Image
            src="/ebook/capa.webp"
            alt="Capa do ebook Judô do Zero: seus primeiros 90 dias no tatame, de Pedro Gozetto"
            fill
            priority={priority}
            sizes={sm ? "144px" : "(min-width: 1024px) 288px, (min-width: 640px) 256px, 224px"}
            className="object-cover"
          />
          {/* Brilho de capa plastificada */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(105deg,rgb(255_255_255/0.18)_0%,transparent_35%,transparent_70%,rgb(0_0_0/0.12)_100%)]"
          />
        </div>
      </div>
    </div>
  );
}
