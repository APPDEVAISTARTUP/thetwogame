import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { getTwoWaitlistDb, isRateLimited } from "./two-db.server";

export const waitlistSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(3, "Please enter your email")
    .max(255, "Email is too long")
    .email("Please enter a valid email address"),
  /** Honeypot: real visitors never fill this. */
  website: z.string().max(200).optional(),
});

export type WaitlistResult = {
  status: "joined" | "exists" | "rate-limited" | "unconfigured" | "failed";
};

function clientIp() {
  return (
    getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
    getRequestHeader("x-real-ip")?.trim() ||
    "unknown"
  );
}

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator(waitlistSchema)
  .handler(async ({ data }): Promise<WaitlistResult> => {
    // Bots that fill the hidden field get a fake success and nothing is stored.
    if (data.website?.trim()) return { status: "joined" };

    const db = getTwoWaitlistDb();
    if (!db) return { status: "unconfigured" };
    if (isRateLimited(`waitlist:${clientIp()}`, 8, 10 * 60 * 1000))
      return { status: "rate-limited" };

    const { error } = await db
      .from("waitlist_signups")
      .insert({ name: data.name, email: data.email.toLowerCase() });

    if (!error) return { status: "joined" };
    if (error.code === "23505") return { status: "exists" };
    console.error("[waitlist] insert failed", error.code, error.message);
    return { status: "failed" };
  });
