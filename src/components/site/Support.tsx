import { useState } from "react";
import { CinematicButton, Reveal, Section, SectionHeading } from "./primitives";

const tiers = [
  { amount: "₹100", title: "Support Development", text: "A coffee for a very long night of level design.", perks: ["Name in supporters list"] },
  { amount: "₹500", title: "Fuel Development", text: "Asset packs, plugins and reference material.", perks: ["Supporters list", "Early screenshots"] },
  {
    amount: "₹1000",
    title: "Founding Survivor",
    text: "Direct funding for the vertical slice build.",
    perks: ["In-game credits", "Closed demo access", "Founding Survivors wall"],
    featured: true,
  },
];

export function Support() {
  const [custom, setCustom] = useState("");

  return (
    <Section id="support" className="hairline">
      <SectionHeading
        eyebrow="Support"
        title="Fund an independent AAA ambition"
        description="TWO is funded entirely by people who want it to exist. Every contribution goes into the build."
      />

      <div className="mt-20 grid gap-6 lg:grid-cols-3">
        {tiers.map((t, i) => (
          <Reveal key={t.amount} delay={i * 0.08}>
            <div
              className={`group relative flex h-full flex-col border p-10 transition-all duration-500 ${
                t.featured
                  ? "border-blood bg-card shadow-[0_0_60px_-30px_var(--color-blood-bright)]"
                  : "border-border bg-background hover:border-foreground/25"
              }`}
            >
              {t.featured && (
                <span className="absolute right-0 top-0 bg-blood px-4 py-2 text-[0.6rem] uppercase tracking-[0.28em] text-primary-foreground">
                  Most chosen
                </span>
              )}
              <div className="font-display text-5xl text-foreground">{t.amount}</div>
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
                <CinematicButton
                  variant={t.featured ? "primary" : "outline"}
                  className="w-full"
                >
                  Contribute
                </CinematicButton>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-col gap-4 border border-border p-8 sm:flex-row sm:items-center">
          <div className="flex-1">
            <div className="font-display text-lg uppercase tracking-[0.16em] text-foreground">
              Custom Amount
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Give what feels right. Every rupee is development time.
            </p>
          </div>
          <div className="flex w-full gap-3 sm:w-auto">
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              inputMode="numeric"
              placeholder="₹"
              aria-label="Custom amount"
              className="w-full border border-border bg-background px-5 py-4 text-sm outline-hidden transition-colors focus:border-blood sm:w-40"
            />
            <CinematicButton variant="outline">Send</CinematicButton>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}