import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { site } from "@/lib/site";

export const alt = "Judô do Zero: ebook de judô para iniciantes, por Pedro Gozetto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagem de compartilhamento 1200x630: fundo vermelho + capa real do ebook. */
export default async function OpengraphImage() {
  // O ImageResponse não lê WebP: converte a capa para PNG em base64 (gerado uma vez, no build).
  const webp = await readFile(join(process.cwd(), "public/ebook/capa.webp"));
  const png = await sharp(webp).resize({ width: 660 }).png().toBuffer();
  const cover = `data:image/png;base64,${png.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          background: "linear-gradient(150deg, #d4152f 0%, #c8102e 45%, #8e0a20 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 3,
              padding: "8px 18px",
              border: "2px solid rgba(255,255,255,0.4)",
              borderRadius: 999,
              alignSelf: "flex-start",
            }}
          >
            GUIA PARA FAIXAS BRANCAS
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.02, marginTop: 28 }}>
            Judô do Zero
          </div>
          <div style={{ display: "flex", fontSize: 38, lineHeight: 1.2, marginTop: 16, opacity: 0.9 }}>
            Seus primeiros 90 dias no tatame
          </div>
          <div style={{ display: "flex", fontSize: 26, marginTop: 36, opacity: 0.8 }}>
            Ebook + vídeos em QR code · {site.authorName}
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse só aceita <img> */}
        <img
          src={cover}
          alt=""
          width={330}
          height={468}
          style={{
            borderRadius: "4px 14px 14px 4px",
            border: "2px solid rgba(255,255,255,0.45)",
            boxShadow: "30px 40px 70px rgba(30,0,6,0.6)",
            transform: "rotate(-5deg)",
          }}
        />
      </div>
    ),
    size,
  );
}
