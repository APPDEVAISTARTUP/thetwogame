import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import ctaCity from "@/assets/cta-city.jpg";
import { supabase } from "@/integrations/supabase/client";
import { CinematicButton, Reveal } from "./primitives";

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
