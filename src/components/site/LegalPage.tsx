import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { LEGAL } from "@/config/legal";

export type LegalSection = { title: string; body: ReactNode };

export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container-x pb-24 pt-36 md:pb-32 md:pt-44">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="display-lg mt-5">{title}</h1>
          <p className="mt-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Last updated: {LEGAL.lastUpdated}
          </p>
          {intro && (
            <div className="mt-10 text-base leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4">
              {intro}
            </div>
          )}
          <div className="mt-12 space-y-12 border-t border-border pt-12">
            {sections.map((s, i) => (
              <section key={s.title} aria-labelledby={`legal-${i}`}>
                <h2
                  id={`legal-${i}`}
                  className="font-display text-lg uppercase tracking-[0.14em] text-foreground md:text-xl"
                >
                  {i + 1}. {s.title}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
          <nav
            aria-label="Policies"
            className="mt-16 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-8 text-xs uppercase tracking-[0.22em] text-muted-foreground"
          >
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/refund-policy" className="hover:text-foreground">
              Refunds
            </Link>
            <Link to="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </nav>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function Mail() {
  return (
    <a href={`mailto:${LEGAL.email}`} className="text-foreground underline underline-offset-4">
      {LEGAL.email}
    </a>
  );
}

export const legalHead = (title: string, description: string, path: string) => ({
  meta: [
    { title: `${title} — TWO | ${LEGAL.brand}` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — TWO` },
    { property: "og:description", content: description },
    { property: "og:url", content: `${LEGAL.website}${path}` },
  ],
  links: [{ rel: "canonical", href: `${LEGAL.website}${path}` }],
});
