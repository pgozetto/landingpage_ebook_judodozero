/**
 * E-mail de entrega (Página 4 da copy).
 * Será enviado pelo backend Express quando o webhook de compra chegar com status "approved".
 * Sem dependências: retorna assunto, pré-cabeçalho, HTML e texto puro.
 */

export interface DeliveryEmailInput {
  buyerName: string;
  downloadUrl: string;
  instagramHandle?: string;
  authorName?: string;
}

const RED = "#C8102E";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildDeliveryEmail({
  buyerName,
  downloadUrl,
  instagramHandle,
  authorName = "Pedro Gozetto",
}: DeliveryEmailInput) {
  const firstName = buyerName.trim().split(/\s+/)[0] || "judoca";
  const signature = instagramHandle
    ? `Judoca faixa marrom · @${instagramHandle}`
    : "Judoca faixa marrom";

  const tips = [
    "Comece pela introdução e pelo capítulo de etiqueta",
    "Pratique as quedas (ukemi) antes de cada treino",
    "Use os QR codes para ver os vídeos das técnicas",
    "Volte ao plano de 90 dias todo mês e refaça o checklist",
  ];

  const subject = "Seu Judô do Zero chegou 🥋";
  const preheader = "Baixe o ebook e comece pelo capítulo 1";

  const text = [
    `Oi, ${firstName}!`,
    "",
    "Obrigado por garantir o Judô do Zero. Seu acesso está aqui:",
    "",
    `Baixar o ebook em PDF: ${downloadUrl}`,
    "",
    "Como aproveitar melhor:",
    ...tips.map((tip, i) => `${i + 1}. ${tip}`),
    "",
    "Lembre-se: o ebook complementa as aulas. Converse sempre com o seu professor e avise se sentir qualquer dor durante o treino.",
    "",
    "Se tiver qualquer dúvida, é só responder este e-mail.",
    "",
    "Bons treinos e nos vemos no tatame!",
    "",
    authorName,
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
          <p style="margin:0 0 20px;">Obrigado por garantir o Judô do Zero. Seu acesso está aqui:</p>
          <p style="margin:0 0 28px;">
            <a href="${escapeHtml(downloadUrl)}" style="display:inline-block;background:${RED};color:#ffffff;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:999px;">Baixar o ebook em PDF</a>
          </p>
          <p style="margin:0 0 8px;font-weight:700;">Como aproveitar melhor:</p>
          <ol style="margin:0 0 20px;padding-left:20px;">${tips.map((t) => `<li style="margin-bottom:6px;">${t}</li>`).join("")}</ol>
          <p style="margin:0 0 16px;">Lembre-se: o ebook complementa as aulas. Converse sempre com o seu professor e avise se sentir qualquer dor durante o treino.</p>
          <p style="margin:0 0 16px;">Se tiver qualquer dúvida, é só responder este e-mail.</p>
          <p style="margin:0 0 24px;">Bons treinos e nos vemos no tatame!</p>
          <p style="margin:0;font-weight:700;">${escapeHtml(authorName)}</p>
          <p style="margin:0;color:#71717A;font-size:14px;">${escapeHtml(signature)}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, preheader, html, text };
}
