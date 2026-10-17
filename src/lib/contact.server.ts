const attempts = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Simple in-memory sliding-window rate limiter, keyed by client IP.
export function rateLimit(key: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(key, recent);
    return false;
  }
  recent.push(now);
  attempts.set(key, recent);
  if (attempts.size > 2000) {
    for (const [k, v] of attempts) {
      if (!v.some((t) => now - t < WINDOW_MS)) attempts.delete(k);
    }
  }
  return true;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  const apiKey = process.env["BREVO_API_KEY"];
  const senderEmail = process.env["BREVO_SENDER_EMAIL"];
  const toEmail = process.env["CONTACT_TO_EMAIL"];

  if (!apiKey || !senderEmail || !toEmail) {
    throw new Error(
      "Missing BREVO_API_KEY, BREVO_SENDER_EMAIL or CONTACT_TO_EMAIL",
    );
  }

  const safeName = data.name.replace(/[\r\n]/g, " ");

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Portfolio Contact Form", email: senderEmail },
      to: [{ email: toEmail }],
      replyTo: { email: data.email, name: safeName },
      subject: `New message from ${safeName}`,
      htmlContent: `
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
      `,
    }),
  });

  if (!res.ok) {
    throw new Error(`Brevo ${res.status}: ${await res.text()}`);
  }
}