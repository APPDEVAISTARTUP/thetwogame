import { Reveal, Section, SectionHeading } from "./primitives";

const steps = [
  {
    phase: "Phase 01",
    title: "Prototype",
    state: "Complete",
    text: "Core movement, first infected AI, one district blockout.",
  },
  {
    phase: "Phase 02",
    title: "Vertical Slice",
    state: "In Development",
    text: "One full playable hour: hospital district, crafting, weather.",
  },
  {
    phase: "Phase 03",
    title: "Closed Demo",
    state: "Next",
    text: "Private build for waitlist members and founding survivors.",
  },
  {
    phase: "Phase 04",
    title: "Steam Page",
    state: "Planned",
    text: "Store page, trailer and press kit go live.",
  },
  {
    phase: "Phase 05",
    title: "Wishlist Campaign",
    state: "Planned",
    text: "Public demo, creator builds, festival submissions.",
  },
  {
    phase: "Phase 06",
    title: "Release",
    state: "TBA",
    text: "PC. When it is genuinely ready — not before.",
  },
];

export function Roadmap() {
  return (
    <Section id="roadmap" className="hairline">
      <SectionHeading
        eyebrow="Roadmap"
        title="Built in the open"
        description="No fake dates. Progress is published as it happens."
      />

      <div className="mt-20 border-l border-border pl-8 md:pl-14">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.05}>
            <div className="group relative pb-14 last:pb-0">
              <span className="absolute -left-[2.3rem] top-2 h-2 w-2 rounded-full bg-border transition-all duration-500 group-hover:bg-blood-bright group-hover:shadow-[0_0_18px_2px_var(--color-blood)] md:-left-[3.8rem]" />
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <span className="eyebrow">{s.phase}</span>
                <span className="text-[0.6rem] uppercase tracking-[0.28em] text-blood-bright">
                  {s.state}
                </span>
              </div>
              <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.05em] text-foreground md:text-4xl">
                {s.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {s.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
