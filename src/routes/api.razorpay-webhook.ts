import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getTwoDb } from "@/lib/two-db.server";
import { isValidWebhookSignature } from "@/lib/razorpay.server";

type RazorpayEvent = {
  event?: string;
  payload?: {
    payment?: { entity?: { id?: string; order_id?: string; status?: string } };
  };
};

/**
 * Razorpay webhook → https://www.playtwo.in/api/razorpay-webhook
 * Events: payment.captured, payment.failed. Backs up the in-browser verification so a donation
 * is still recorded if the visitor closes the tab right after paying.
 */
export const Route = createFileRoute("/api/razorpay-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["RAZORPAY_WEBHOOK_SECRET"]?.trim();
        const db = getTwoDb();
        if (!secret || !db) return new Response("Not configured", { status: 503 });

        const raw = await request.text();
        const signature = request.headers.get("x-razorpay-signature") ?? "";
        if (!signature || !(await isValidWebhookSignature(secret, raw, signature))) {
          return new Response("Invalid signature", { status: 400 });
        }

        let event: RazorpayEvent;
        try {
          event = JSON.parse(raw) as RazorpayEvent;
        } catch {
          return new Response("Bad payload", { status: 400 });
        }

        const payment = event.payload?.payment?.entity;
        if (!payment?.order_id) return new Response("ok");

        if (event.event === "payment.captured") {
          const { error } = await db
            .from("donations")
            .update({
              status: "paid",
              razorpay_payment_id: payment.id,
              paid_at: new Date().toISOString(),
            })
            .eq("razorpay_order_id", payment.order_id)
            .neq("status", "paid");
          if (error) return new Response("DB error", { status: 500 });
        } else if (event.event === "payment.failed") {
          await db
            .from("donations")
            .update({ status: "failed" })
            .eq("razorpay_order_id", payment.order_id)
            .eq("status", "created");
        }
        return new Response("ok");
      },
    },
  },
});
