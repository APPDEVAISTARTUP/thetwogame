import { Reveal, Section, SectionHeading } from "./primitives";

const founders = ["MuzamaPlayz"];
const remaining = 99 - founders.length;

export function Supporters() {
  return (
    <Section id="founders" className="hairline">
      <SectionHeading
        align="center"
        eyebrow="Founding Survivors"
        title="The first hundred names"
        description="Founding Survivors are credited in-game and receive every closed build before anyone else."
      />

      <div className="mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
        {founders.map((name, i) => (
          <Reveal key={name}>
            <div className="relative bg-card p-8 text-center">
              <div className="font-display text-xs tracking-[0.3em] text-blood-bright">
                #{String(i + 1).padStart(3, "0")}
              </div>
              <div className="mt-3 font-display text-xl uppercase tracking-[0.1em] text-foreground">
                {name}
              </div>
              <div className="mt-2 text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                First Supporter
              </div>
            </div>
          </Reveal>
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center bg-background p-8 text-center font-display text-xs tracking-[0.3em] text-muted-foreground/40"
          >
            #{String(founders.length + i + 1).padStart(3, "0")}
          </div>
        ))}
      </div>

      <Reveal>
        <p className="mt-10 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {remaining} founding places remaining
        </p>
      </Reveal>
    </Section>
  );
}