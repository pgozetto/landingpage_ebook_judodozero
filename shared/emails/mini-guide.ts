/**
 * E-mail da amostra grátis (public/mini-guia.pdf).
 * Enviado na hora da inscrição em /mini-guia, pela API transacional do Brevo (src/lib/brevo.ts).
 */

export interface MiniGuideEmailInput {
  name: string;
  downloadUrl: string;
  salesPageUrl: string;
  instagramHandle?: string;
}

const RED = "#C8102E";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildMiniGuideEmail({ name, downloadUrl, salesPageUrl, instagramHandle }: MiniGuideEmailInput) {
  const firstName = name.trim().split(/\s+/)[0] || "judoca";
  const subject = "Sua amostra grátis do Judô do Zero chegou 🥋";
  const preheader = "Os primeiros capítulos para o seu primeiro treino";
  const signature = instagramHandle ? `Pedro Gozetto · @${instagramHandle}` : "Pedro Gozetto";

  const text = [
    `Oi, ${firstName}!`,
    "",
    "Aqui está a sua amostra grátis: os 5 erros clássicos de faixa branca, o que levar ao primeiro treino, a etiqueta no dojo e como amarrar a faixa.",
    "",
    `Baixar a amostra grátis: ${downloadUrl}`,
    "",
    `Quando quiser o guia completo, com as 5 projeções, as imobilizações e o plano de 90 dias: ${salesPageUrl}`,
    "",
    "Bons treinos e nos vemos no tatame!",
    signature,
  ].join("\n");

  const html = `<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${subject}</title></head>
<body style="margin:0;background:#FAF8F7;font-family:Arial,Helvetica,sans-serif;color:#27272A;">
  <span style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F7;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;">
        <tr><td style="background:${RED};padding:20px 28px;color:#ffffff;font-weight:800;letter-spacing:.04em;">JUDÔ DO ZERO</td></tr>
        <tr><td style="padding:28px;font-size:16px;line-height:1.6;">
          <p style="margin:0 0 16px;">Oi, ${escapeHtml(firstName)}!</p>
          <p style="margin:0 0 24px;">Aqui está a sua amostra grátis: os 5 erros clássicos de faixa branca, o que levar ao primeiro treino, a etiqueta no dojo e como amarrar a faixa.</p>
          <p style="margin:0 0 28px;">
            <a href="${escapeHtml(downloadUrl)}" style="display:inline-block;background:${RED};color:#ffffff;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:999px;">Baixar a amostra grátis</a>
          </p>
          <p style="margin:0 0 24px;">Quando quiser o guia completo, com as 5 projeções, as imobilizações e o plano de 90 dias,
            <a href="${escapeHtml(salesPageUrl)}" style="color:${RED};font-weight:700;">conheça o Judô do Zero</a>.</p>
          <p style="margin:0 0 4px;">Bons treinos e nos vemos no tatame!</p>
          <p style="margin:0;color:#71717A;font-size:14px;">${escapeHtml(signature)}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, preheader, html, text };
}
