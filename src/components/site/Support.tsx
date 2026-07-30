import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { FUNDING_GOAL, FUNDING_RAISED, formatInr } from "@/config/support";
import { CinematicButton, Reveal, Section, SectionHeading } from "./primitives";

const tiers = [
  {
    amount: "₹100",
    title: "Supporter",
    text: "A coffee for a very long night of level design.",
    perks: ["Digital thank you"],
  },
  {
    amount: "₹500",
    title: "Backer",
    text: "Asset packs, plugins and reference material.",
    perks: ["Supporter role", "Name on the supporters page"],
  },
  {
    amount: "₹1000",
    title: "Champion",
    text: "Direct funding for the vertical slice build.",
    perks: ["Supporter badge", "Name in game credits", "Priority demo access"],
    featured: true,
  },
];

export function Support() {
  const percent = Math.min(100, Math.round((FUNDING_RAISED / FUNDING_GOAL) * 100));

  return (
    <Section id="support" className="hairline">
      <SectionHeading
        eyebrow="Support"
        title="Fund an independent AAA ambition"
        description="TWO is funded entirely by people who want it to exist. Every contribution goes into the build."
      />

      <Reveal delay={0.1}>
        <div className="mt-14 border border-border bg-card p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="font-display text-3xl text-foreground md:text-4xl">
              {formatInr(FUNDING_RAISED)}
              <span className="ml-3 text-sm tracking-[0.2em] text-muted-foreground">
                of {formatInr(FUNDING_GOAL)}
              </span>
            </div>
            <span className="text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
              {percent}% funded
            </span>
          </div>
          <div className="mt-6 h-1.5 w-full overflow-hidden bg-secondary">
            <div
              style={{ width: `${percent}%` }}
              className="h-full bg-linear-to-r from-blood to-blood-bright transition-all duration-700"
            />
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {tiers.map((t, i) => (
          <Reveal key={t.amount} delay={i * 0.08}>
            <div
              className={`group relative flex h-full flex-col border p-8 transition-all duration-500 md:p-10 ${
                t.featured
                  ? "border-blood bg-card shadow-[0_0_60px_-30px_var(--color-blood-bright)]"
                  : "border-border bg-background hover:-translate-y-1 hover:border-foreground/25"
              }`}
            >
              {t.featured && (
                <span className="absolute right-0 top-0 bg-blood px-4 py-2 text-[0.6rem] uppercase tracking-[0.28em] text-primary-foreground">
                  Most chosen
                </span>
              )}
              <div className="font-display text-4xl text-foreground md:text-5xl">{t.amount}</div>
              <h3 className="mt-6 font-display text-lg uppercase tracking-[0.16em] text-foreground">
                {t.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              <ul className="mt-8 space-y-3 border-t border-border pt-8">
                {t.perks.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    <span className="h-px w-4 bg-blood" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link to="/support" className="block">
                  <CinematicButton variant={t.featured ? "primary" : "outline"} className="w-full">
                    Contribute
                  </CinematicButton>
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-col gap-5 border border-border p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-display text-lg uppercase tracking-[0.16em] text-foreground">
              Custom Amount & UPI
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Pay any amount instantly with GPay, PhonePe, Paytm or BHIM.
            </p>
          </div>
          <Link
            to="/support"
            className="group inline-flex items-center justify-center gap-3 border border-border px-7 py-4 font-display text-xs uppercase tracking-[0.26em] text-foreground transition-colors duration-300 hover:border-blood"
          >
            Open Support Page
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}