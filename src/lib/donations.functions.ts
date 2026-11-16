import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { FUNDING_RAISED_OFFLINE, MAX_DONATION_INR, MIN_DONATION_INR } from "@/config/support";
import { getTwoDb, isRateLimited } from "./two-db.server";
import { createRazorpayOrder, isValidPaymentSignature, razorpayConfig } from "./razorpay.server";

export const donationSchema = z.object({
  amountInr: z
    .number()
    .int("Use a whole rupee amount")
    .min(MIN_DONATION_INR, `Minimum donation is ₹${MIN_DONATION_INR}`)
    .max(MAX_DONATION_INR, `Maximum donation is ₹${MAX_DONATION_INR.toLocaleString("en-IN")}`),
  name: z.string().trim().min(1, "Please enter your name").max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .max(255)
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().max(280, "Message is too long (max 280 characters)").optional(),
  isPublic: z.boolean(),
});

export type CreateDonationResult =
  | {
      status: "created";
      keyId: string;
      orderId: string;
      amountPaise: number;
      currency: string;
    }
  | { status: "unconfigured" | "rate-limited" | "failed" };

function clientIp() {
  return (
    getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
    getRequestHeader("x-real-ip")?.trim() ||
    "unknown"
  );
}

export const createDonationOrder = createServerFn({ method: "POST" })
  .inputValidator(donationSchema)
  .handler(async ({ data }): Promise<CreateDonationResult> => {
    const db = getTwoDb();
    const rzp = razorpayConfig();
    if (!db || !rzp) return { status: "unconfigured" };
    if (isRateLimited(`donate:${clientIp()}`, 10, 10 * 60 * 1000))
      return { status: "rate-limited" };

    const amountPaise = data.amountInr * 100;
    try {
      const order = await createRazorpayOrder(rzp, {
        amountPaise,
        receipt: `two_${Date.now().toString(36)}`,
        notes: { purpose: "Support TWO", name: data.name.slice(0, 80) },
      });

      const { error } = await db.from("donations").insert({
        razorpay_order_id: order.id,
        amount_paise: amountPaise,
        currency: order.currency,
        name: data.name,
        email: data.email ? data.email.toLowerCase() : null,
        message: data.message || null,
        is_public: data.isPublic,
      });
      if (error) {
        console.error("[donations] insert failed", error.code, error.message);
        return { status: "failed" };
      }

      return {
        status: "created",
        keyId: rzp.keyId,
        orderId: order.id,
        amountPaise,
        currency: order.currency,
      };
    } catch (err) {
      console.error("[donations] create order failed", err);
      return { status: "failed" };
    }
  });

const verifySchema = z.object({
  orderId: z.string().min(1).max(64),
  paymentId: z.string().min(1).max(64),
  signature: z.string().min(1).max(256),
});

export const verifyDonation = createServerFn({ method: "POST" })
  .inputValidator(verifySchema)
  .handler(
    async ({ data }): Promise<{ status: "paid" | "invalid" | "unconfigured" | "failed" }> => {
      const db = getTwoDb();
      const rzp = razorpayConfig();
      if (!db || !rzp) return { status: "unconfigured" };

      const valid = await isValidPaymentSignature(
        rzp.keySecret,
        data.orderId,
        data.paymentId,
        data.signature,
      );
      if (!valid) return { status: "invalid" };

      const { error } = await db
        .from("donations")
        .update({
          status: "paid",
          razorpay_payment_id: data.paymentId,
          paid_at: new Date().toISOString(),
        })
        .eq("razorpay_order_id", data.orderId)
        .neq("status", "paid");
      if (error) {
        console.error("[donations] mark paid failed", error.code, error.message);
        return { status: "failed" };
      }
      return { status: "paid" };
    },
  );

export type SupportStats = {
  raisedInr: number;
  supporterCount: number;
  recent: { id: string; name: string; amountInr: number; message: string | null; paidAt: string }[];
};

export const getSupportStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<SupportStats> => {
    const empty: SupportStats = {
      raisedInr: FUNDING_RAISED_OFFLINE,
      supporterCount: 0,
      recent: [],
    };
    const db = getTwoDb();
    if (!db) return empty;

    const [{ data: paid, error: sumError }, { data: recent, error: recentError }] =
      await Promise.all([
        db.from("donations").select("amount_paise").eq("status", "paid"),
        db
          .from("donations")
          .select("id, name, amount_paise, message, paid_at")
          .eq("status", "paid")
          .eq("is_public", true)
          .order("paid_at", { ascending: false })
          .limit(12),
      ]);
    if (sumError || recentError) {
      console.error("[donations] stats failed", sumError?.message ?? recentError?.message);
      return empty;
    }

    const paidPaise = (paid ?? []).reduce((total, row) => total + Number(row.amount_paise), 0);
    return {
      raisedInr: FUNDING_RAISED_OFFLINE + Math.floor(paidPaise / 100),
      supporterCount: paid?.length ?? 0,
      recent: (recent ?? []).map((row) => ({
        id: String(row.id),
        name: String(row.name),
        amountInr: Math.floor(Number(row.amount_paise) / 100),
        message: (row.message as string | null) ?? null,
        paidAt: String(row.paid_at),
      })),
    };
  },
);
