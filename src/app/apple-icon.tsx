import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Ícone para a tela inicial do iPhone (mesmo desenho do icon.svg). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#C8102E" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path d="M38 13v21a10 10 0 0 1-20 0" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
          <rect x="8" y="50" width="48" height="6" rx="3" fill="#4A0510" />
        </svg>
      </div>
    ),
    size,
  );
}
