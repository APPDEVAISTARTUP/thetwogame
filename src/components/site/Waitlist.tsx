import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import ctaCity from "@/assets/cta-city.jpg";
import { supabase } from "@/integrations/supabase/client";
import { CinematicButton, Reveal } from "./primitives";

const TICKER = [
  "Recruit registered — Delhi",
  "Recruit registered — Mumbai",
  "Closed demo slots limited",
  "Recruit registered — Pune",
  "Development letters inbound",
  "Recruit registered — Bengaluru",
  "Night one access",
  "Recruit registered — Kolkata",
];

function WaitlistTicker() {
  const loop = [...TICKER, ...TICKER];
  return (
    <div className="relative mx-auto mb-14 max-w-4xl overflow-hidden border-y border-border bg-background/60">
      <div
        className="flex w-max gap-10 whitespace-nowrap py-3 will-change-transform"
        style={{ animation: "marquee-x 44s linear infinite" }}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-display text-[0.62rem] uppercase tracking-[0.34em] text-muted-foreground"
          >
            <span>{item}</span>
            <span className="h-1 w-1 rotate-45 bg-blood" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
    </div>
  );
}

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(3, "Please enter your email")
    .max(255, "Email is too long")
    .email("Please enter a valid email address"),
});

export function Waitlist() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const filled = (name.trim() ? 1 : 0) + (schema.shape.email.safeParse(email).success ? 1 : 0);
  const progress = loading ? 100 : (filled / 2) * 100;
  const statusLabel = loading
    ? "Transmitting…"
    : filled === 0
      ? "Awaiting operator ID"
      : filled === 1
        ? "One field remaining"
        : "Ready to transmit";

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = schema.safeParse({ name, email });
    if (!parsed.success) {
      const message = parsed.error.issues[0].message;
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    const { error: insertError } = await supabase.from("waitlist_signups").insert({
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
    });
    setLoading(false);

    if (insertError) {
      const duplicate =
        insertError.code === "23505" || insertError.message.toLowerCase().includes("duplicate");
      const message = duplicate
        ? "This email is already on the waitlist."
        : "Something went wrong. Please try again in a moment.";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("You're on the waitlist.");
    void navigate({
      to: "/waitlist/success",
      search: { name: parsed.data.name, email: parsed.data.email.toLowerCase() },
    });
  };

  return (
    <section id="waitlist" className="relative grain overflow-hidden py-24 md:py-48">
      <img
        src={ctaCity}
        alt="Helicopter searchlights over a burning city skyline"
        loading="lazy"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-background/85" />
      <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />

      <div className="container-x relative">
        <WaitlistTicker />
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <span className="eyebrow">Waitlist</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-lg mt-6">Be there on night one</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Closed demo access, development letters and nothing else. No noise.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <form onSubmit={onSubmit} noValidate className="mt-12 flex flex-col gap-4">
              <div className="flex items-center justify-between font-display text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rotate-45 ${loading || filled === 2 ? "bg-blood-bright" : "bg-muted-foreground"}`}
                  />
                  {statusLabel}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-px w-full bg-border">
                <div
                  className="h-px bg-blood-bright shadow-[0_0_12px_var(--color-blood-bright)] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                maxLength={100}
                autoComplete="name"
                aria-label="Name"
                className="w-full border border-border bg-background/60 px-6 py-4 text-sm tracking-wide text-foreground outline-hidden transition-colors duration-300 placeholder:text-muted-foreground focus:border-blood"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
                maxLength={255}
                autoComplete="email"
                inputMode="email"
                aria-label="Email"
                className="w-full border border-border bg-background/60 px-6 py-4 text-sm tracking-wide text-foreground outline-hidden transition-colors duration-300 placeholder:text-muted-foreground focus:border-blood"
              />
              {error && (
                <p role="alert" className="text-left text-xs tracking-wide text-destructive">
                  {error}
                </p>
              )}
              <CinematicButton type="submit" className="w-full" disabled={loading}>
                {loading ? "Joining…" : "Join Waitlist"}
              </CinematicButton>
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
