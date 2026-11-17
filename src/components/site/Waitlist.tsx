import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import ctaCity from "@/assets/cta-city.jpg";
import { joinWaitlist, waitlistSchema } from "@/lib/waitlist.functions";
import { Embers } from "./Embers";
import { CinematicButton, Reveal } from "./primitives";

const schema = waitlistSchema;

export function Waitlist() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

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
    let status: Awaited<ReturnType<typeof joinWaitlist>>["status"];
    try {
      status = (await joinWaitlist({ data: { ...parsed.data, website } })).status;
    } catch {
      status = "failed";
    }
    setLoading(false);

    if (status !== "joined" && status !== "exists") {
      const message =
        status === "rate-limited"
          ? "Too many attempts. Please wait a few minutes and try again."
          : status === "unconfigured"
            ? "The waitlist is being set up. Please try again shortly."
            : "Something went wrong. Please try again in a moment.";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success(
      status === "exists" ? "You're already on the waitlist." : "You're on the waitlist.",
    );
    void navigate({
      to: "/waitlist/success",
      search: { name: parsed.data.name, email: parsed.data.email.toLowerCase() },
    });
  };

  const field =
    "w-full border border-foreground/20 bg-black/40 px-5 py-4 text-base text-foreground outline-hidden transition-colors duration-300 placeholder:text-foreground/45 focus:border-foreground";

  return (
    <section
      id="waitlist"
      data-night="05:00"
      className="relative scroll-mt-20 overflow-hidden py-32 md:py-52"
    >
      <img
        src={ctaCity}
        alt=""
        aria-hidden
        loading="lazy"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-background/55" />
      <Embers className="mix-blend-screen" density={0.6} />
      <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-screen"
        style={{
          background:
            "linear-gradient(to top, oklch(0.6 0.1 240 / 0.28), oklch(0.6 0.1 240 / 0.06) 60%, transparent)",
        }}
      />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-24">
        <div>
          <Reveal>
            <span className="eyebrow">05:00 · First light</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-xl mt-5 text-foreground">Be there on night one</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/75 md:text-lg">
              You made it to morning. Join the waitlist for closed demo access and development
              letters. Nothing else.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
            <label className="sr-only" htmlFor="waitlist-name">
              Name
            </label>
            <input
              id="waitlist-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              maxLength={100}
              autoComplete="name"
              className={field}
            />
            <label className="sr-only" htmlFor="waitlist-email">
              Email
            </label>
            <input
              id="waitlist-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email address"
              required
              maxLength={255}
              autoComplete="email"
              inputMode="email"
              className={field}
            />
            <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
              <label>
                Leave this empty
                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </label>
            </div>
            {error && (
              <p role="alert" className="text-sm text-blood-bright">
                {error}
              </p>
            )}
            <CinematicButton type="submit" className="mt-2 w-full" disabled={loading}>
              {loading ? "Joining…" : "Join the waitlist"}
            </CinematicButton>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-foreground/55">
              No spam. Unsubscribe any time.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
