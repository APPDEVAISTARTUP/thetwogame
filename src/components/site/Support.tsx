import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, Section, buttonClass } from "./primitives";

const tiers = [
  { amount: "₹100", title: "Supporter", perk: "A personal thank-you" },
  { amount: "₹500", title: "Backer", perk: "Supporter role and your name on the wall" },
  {
    amount: "₹1,000",
    title: "Champion",
    perk: "Name in the game credits and priority demo access",
  },
];

export function Support() {
  return (
    <Section id="support">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
        <div>
          <Reveal>
            <span className="eyebrow">Support</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-lg mt-5 text-foreground">Fund an independent AAA ambition</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              TWO is funded by the people who want it to exist. Every contribution goes into the
              build. Pay any amount with UPI, cards or netbanking.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <Link to="/support" className={cn(buttonClass("primary"), "mt-10")}>
              Support TWO <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="border-t border-border">
          {tiers.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.06}>
              <div className="grid grid-cols-[6.5rem_1fr] items-baseline gap-6 border-b border-border py-7 md:grid-cols-[9rem_1fr]">
                <span className="font-display text-4xl font-extrabold text-foreground md:text-5xl">
                  {t.amount}
                </span>
                <div>
                  <p className="font-display text-xl font-bold uppercase text-foreground">
                    {t.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{t.perk}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
