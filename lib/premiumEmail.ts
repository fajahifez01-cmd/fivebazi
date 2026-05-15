import { Resend } from "resend";
import type { PremiumOrder } from "./premiumOrder";

/**
 * Sends the "your premium destiny report is ready" email after generation
 * finishes. Resend free tier covers 3 000 emails / month — plenty for early
 * traffic.
 */
export async function sendPremiumReadyEmail(
  order: PremiumOrder,
  origin: string,
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "Missing RESEND_API_KEY" };
  }
  const fromAddress = process.env.RESEND_FROM ?? "FiveBaZi <reports@fivebazi.com>";

  const reportUrl = `${origin}/premium-report/${order.orderId}`;
  const subject = `Your FiveBaZi Premium Destiny Report — ${order.name}`;

  const html = `
<div style="font-family: 'Georgia', 'Times New Roman', serif; max-width: 580px; margin: 0 auto; padding: 32px 24px; color: #2a1e10; background: #f7ebd1;">
  <p style="text-align: center; font-size: 11px; letter-spacing: 4px; color: #b89351; text-transform: uppercase; margin-bottom: 8px;">
    ✦ Premium Destiny Report ✦
  </p>
  <h1 style="font-family: Georgia, serif; font-weight: normal; font-size: 32px; text-align: center; color: #2a1e10; margin: 0 0 24px;">
    Your reading is ready
  </h1>
  <p style="font-size: 16px; line-height: 1.6;">Hi ${escapeHtml(order.name)},</p>
  <p style="font-size: 16px; line-height: 1.6;">
    Your personalized FiveBaZi reading has been written — a 6-dimension destiny
    map (Love · Career · Wealth · Health · Family · Soul), each with a
    ~1 000-word deep analysis grounded in your actual chart, plus your awakened
    Day Master portrait.
  </p>
  <p style="text-align: center; margin: 36px 0;">
    <a href="${reportUrl}" style="display: inline-block; background: #2a1e10; color: #f7ebd1; padding: 14px 36px; text-decoration: none; border-radius: 30px; font-size: 16px;">
      Open my report
    </a>
  </p>
  <p style="font-size: 14px; color: #5a4220; line-height: 1.6;">
    This link is yours forever — bookmark it and come back to re-read whenever
    the seasons shift on you.
  </p>
  <p style="font-size: 14px; color: #5a4220; line-height: 1.6;">
    If anything looks off, just reply to this email.
  </p>
  <hr style="border: none; border-top: 1px solid rgba(184, 147, 81, 0.3); margin: 32px 0;">
  <p style="text-align: center; font-size: 10px; letter-spacing: 3px; color: #a98850; text-transform: uppercase;">
    fivebazi.com
  </p>
</div>
`;

  const resend = new Resend(apiKey);
  try {
    const res = await resend.emails.send({
      from: fromAddress,
      to: order.email,
      subject,
      html,
    });
    if (res.error) {
      return { ok: false, error: res.error.message };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Email send failed",
    };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
