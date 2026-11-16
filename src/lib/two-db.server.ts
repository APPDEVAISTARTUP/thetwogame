import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only client for TWO's own Supabase project (waitlist + donations).
 * Kept separate from the Lovable Cloud client in src/integrations/supabase.
 *
 * Env (set in Vercel → Project → Settings → Environment Variables, never VITE_-prefixed):
 *   TWO_SUPABASE_URL              https://<ref>.supabase.co
 *   TWO_SUPABASE_PUBLISHABLE_KEY  sb_publishable_… (enough for the waitlist: anon INSERT only)
 *   TWO_SUPABASE_SECRET_KEY       sb_secret_… or service_role (required for donations)
 */
const clients = new Map<string, SupabaseClient>();

function isNewApiKey(key: string) {
  return key.startsWith("sb_secret_") || key.startsWith("sb_publishable_");
}

function makeClient(url: string, key: string) {
  const cached = clients.get(key);
  if (cached) return cached;
  const created = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      // New sb_ keys are opaque strings, not JWTs: send them only as `apikey`.
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (isNewApiKey(key) && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
  clients.set(key, created);
  return created;
}

/** Full-access client (secret key). Needed for donations. */
export function getTwoDb(): SupabaseClient | null {
  const url = process.env["TWO_SUPABASE_URL"]?.trim();
  const key = process.env["TWO_SUPABASE_SECRET_KEY"]?.trim();
  return url && key ? makeClient(url, key) : null;
}

/** Client for waitlist inserts: secret key if set, otherwise the publishable key. */
export function getTwoWaitlistDb(): SupabaseClient | null {
  const url = process.env["TWO_SUPABASE_URL"]?.trim();
  const key =
    process.env["TWO_SUPABASE_SECRET_KEY"]?.trim() ||
    process.env["TWO_SUPABASE_PUBLISHABLE_KEY"]?.trim();
  return url && key ? makeClient(url, key) : null;
}

const hits = new Map<string, { count: number; resetAt: number }>();

/** Best-effort in-memory rate limit (per server instance). */
export function isRateLimited(bucket: string, max: number, windowMs: number) {
  const now = Date.now();
  const current = hits.get(bucket);
  if (!current || current.resetAt <= now) {
    hits.set(bucket, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (current.count >= max) return true;
  current.count += 1;
  return false;
}
