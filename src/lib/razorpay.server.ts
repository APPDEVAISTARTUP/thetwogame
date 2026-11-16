/**
 * Razorpay helpers (server-only).
 *
 * Env (Vercel → Settings → Environment Variables):
 *   RAZORPAY_KEY_ID          rzp_test_… / rzp_live_… (public; sent to the browser for Checkout)
 *   RAZORPAY_KEY_SECRET      secret — never expose to the browser
 *   RAZORPAY_WEBHOOK_SECRET  secret you choose when adding the webhook in the Razorpay dashboard
 */
export function razorpayConfig() {
  const keyId = process.env["RAZORPAY_KEY_ID"]?.trim();
  const keySecret = process.env["RAZORPAY_KEY_SECRET"]?.trim();
  if (!keyId || !keySecret) return null;
  return { keyId, keySecret };
}

export async function createRazorpayOrder(
  cfg: { keyId: string; keySecret: string },
  input: { amountPaise: number; receipt: string; notes: Record<string, string> },
): Promise<{ id: string; amount: number; currency: string }> {
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${cfg.keyId}:${cfg.keySecret}`)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: input.amountPaise,
      currency: "INR",
      receipt: input.receipt,
      notes: input.notes,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Razorpay order failed (${res.status}): ${body.slice(0, 300)}`);
  }
  return (await res.json()) as { id: string; amount: number; currency: string };
}

async function hmacSha256Hex(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Checkout success signature: HMAC_SHA256(order_id + "|" + payment_id, key_secret). */
export async function isValidPaymentSignature(
  keySecret: string,
  orderId: string,
  paymentId: string,
  signature: string,
) {
  return safeEqual(await hmacSha256Hex(keySecret, `${orderId}|${paymentId}`), signature);
}

/** Webhook signature: HMAC_SHA256(raw request body, webhook_secret). */
export async function isValidWebhookSignature(secret: string, rawBody: string, signature: string) {
  return safeEqual(await hmacSha256Hex(secret, rawBody), signature);
}
