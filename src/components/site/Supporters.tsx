import { Reveal, Section } from "./primitives";

const founders = ["MuzmaPlayz"];
const total = 100;

export function Supporters() {
  const remaining = total - founders.length;
  return (
    <Section id="founders" className="hairline">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
        <div>
          <Reveal>
            <span className="eyebrow">Founding survivors</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-lg mt-5 text-foreground">The first hundred names</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              Founding survivors are credited in the game and get every closed build before anyone
              else.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {founders.map((name) => (
                <li
                  key={name}
                  className="font-display text-4xl font-bold uppercase text-foreground"
                >
                  {name}
                </li>
              ))}
            </ul>
            <div className="mt-8 h-[3px] w-full bg-foreground/10">
              <div
                className="h-full bg-blood-bright"
                style={{ width: `${(founders.length / total) * 100}%` }}
              />
            </div>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {founders.length} of {total} · {remaining} places left
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
