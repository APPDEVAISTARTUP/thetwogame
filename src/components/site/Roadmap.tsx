import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "./primitives";

type State = "done" | "now" | "next";

const steps: { title: string; state: State; label: string; text: string }[] = [
  {
    title: "Prototype",
    state: "done",
    label: "Complete",
    text: "Core movement, first infected AI, one district blockout.",
  },
  {
    title: "Vertical slice",
    state: "now",
    label: "In development",
    text: "One full playable hour: hospital district, crafting, weather.",
  },
  {
    title: "Closed demo",
    state: "next",
    label: "Next",
    text: "Private build for waitlist members and founding survivors.",
  },
  {
    title: "Steam page",
    state: "next",
    label: "Planned",
    text: "Store page, trailer and press kit go live.",
  },
  {
    title: "Public demo",
    state: "next",
    label: "Planned",
    text: "Wishlist campaign, creator builds, festival submissions.",
  },
  {
    title: "Release",
    state: "next",
    label: "TBA",
    text: "On PC, when it is genuinely ready.",
  },
];

export function Roadmap() {
  return (
    <Section id="roadmap">
      <SectionHeading
        eyebrow="Roadmap"
        title="Built in the open"
        description="No fake dates. Progress is shared as it happens."
      />

      <ol className="mt-16 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-6">
        {steps.map((s, i) => (
          <li key={s.title} className="relative pt-8 pb-10 lg:pb-0">
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-0 top-0 h-[3px]",
                s.state === "done" && "bg-foreground/60",
                s.state === "now" && "bg-blood-bright",
                s.state === "next" && "bg-foreground/10",
              )}
            />
            <span className="font-mono text-xs text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold uppercase text-foreground">
              {s.title}
            </h3>
            <p
              className={cn(
                "mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em]",
                s.state === "now" ? "text-blood-bright" : "text-muted-foreground",
              )}
            >
              {s.label}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
