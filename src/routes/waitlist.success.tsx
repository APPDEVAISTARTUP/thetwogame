import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, MessagesSquare } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BrandWordmark } from "@/components/site/BrandLogo";
import { CinematicButton, Reveal } from "@/components/site/primitives";
import { LINKS } from "@/config/support";
import { InstagramIcon } from "@/components/site/icons";

const description =
  "You're on the TWO waitlist. You'll be contacted personally with closed demo access and development letters from the solo developer behind TWO.";

type Search = { name?: string; email?: string };

export const Route = createFileRoute("/waitlist/success")({
  component: WaitlistSuccess,
  validateSearch: (search: Record<string, unknown>): Search => ({
    name: typeof search.name === "string" ? search.name.slice(0, 100) : undefined,
    email: typeof search.email === "string" ? search.email.slice(0, 255) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "You're on the TWO Waitlist — Spot Saved" },
      { name: "description", content: description },
      { property: "og:title", content: "You're on the TWO Waitlist" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "You're on the TWO Waitlist" },
      { name: "twitter:description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const steps = [
  {
    n: "01",
    title: "Your spot is saved",
    text: "You're locked into the waitlist. No further action needed from your side.",
  },
  {
    n: "02",
    title: "Personal reach-out",
    text: "The developer contacts every person on the list personally — no automated blasts.",
  },
  {
    n: "03",
    title: "Wait for night one",
    text: "You'll get closed demo access and development letters — nothing else, no noise.",
  },
];

function WaitlistSuccess() {
  const { name, email } = Route.useSearch();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="grain relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_0%,var(--color-blood)/25%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-background" />

        <section className="container-x relative pb-24 pt-36 md:pb-32 md:pt-48">
          <div className="relative mx-auto mb-14 max-w-5xl overflow-hidden border-y border-border bg-background/60">
            <div
              className="flex w-max gap-10 whitespace-nowrap py-3 will-change-transform"
              style={{ animation: "marquee-x 40s linear infinite" }}
            >
              {[...Array(2)].flatMap((_, r) =>
                [
                  "Access granted",
                  "Operator registered",
                  "Closed demo — pending",
                  "Development letters — enabled",
                  "Standby for night one",
                ].map((t, i) => (
                  <span
                    key={`${r}-${i}`}
                    className="flex items-center gap-10 font-display text-[0.62rem] uppercase tracking-[0.34em] text-blood-bright"
                  >
                    <span>{t}</span>
                    <span className="h-1 w-1 rotate-45 bg-blood" />
                  </span>
                )),
              )}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <BrandWordmark className="mx-auto w-40 md:w-52" />
            </Reveal>
            <Reveal delay={0.08}>
              <span className="mt-10 inline-flex items-center gap-3 border border-blood/50 bg-blood/10 px-5 py-2 font-display text-[0.62rem] uppercase tracking-[0.32em] text-blood-bright">
                <span className="h-1.5 w-1.5 rotate-45 bg-blood-bright" />
                Waitlist confirmed
              </span>
            </Reveal>
            <Reveal delay={0.14}>
              <h1 className="display-lg mt-6">
                {name ? `Welcome, ${name}` : "You are on the list"}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Your spot is saved
                {email ? (
                  <>
                    {" "}
                    for <span className="text-foreground">{email}</span>
                  </>
                ) : null}
                . You'll be reached out to personally when the closed demo opens.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mx-auto mt-10 max-w-md">
                <div className="flex items-center justify-between font-display text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
                  <span>Registration</span>
                  <span className="text-blood-bright">100%</span>
                </div>
                <div className="mt-3 h-px w-full bg-border">
                  <div className="h-px w-full bg-blood-bright shadow-[0_0_14px_var(--color-blood-bright)]" />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:mt-20 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={0.1 + i * 0.08}>
                <div className="group h-full border border-border bg-background p-8 transition-all duration-500 hover:-translate-y-1 hover:border-blood">
                  <span className="font-display text-3xl text-blood-bright">{s.n}</span>
                  <h2 className="mt-6 font-display text-sm uppercase tracking-[0.18em] text-foreground">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mx-auto mt-16 flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Link to="/support">
                <CinematicButton className="w-full sm:w-auto">
                  Support TWO <ArrowUpRight size={14} />
                </CinematicButton>
              </Link>
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border px-7 py-4 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:border-blood hover:text-foreground"
              >
                <InstagramIcon size={14} className="text-blood-bright" /> Follow the build
              </a>
              <a
                href={LINKS.discord}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border px-7 py-4 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:border-blood hover:text-foreground"
              >
                <MessagesSquare size={14} className="text-blood-bright" /> Join Discord
              </a>
            </div>
          </Reveal>

          <div className="mt-14 text-center">
            <Link
              to="/"
              className="text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Back to the game
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
