import { Reveal, Section, SectionHeading } from "./primitives";

const features = [
  { title: "Open world", text: "One continuous city and countryside, with no loading walls." },
  {
    title: "Grounded survival",
    text: "No superpowers, no arcade waves. One bite changes everything.",
  },
  { title: "Weighty combat", text: "Stamina, noise and consequence in every encounter." },
  { title: "Exploration", text: "Silence, light and sound guide you, not waypoints." },
  { title: "Scarce inventory", text: "Space is limited. What you carry decides how you survive." },
  { title: "Crafting", text: "Improvise from whatever a collapsing city leaves behind." },
  { title: "Environmental story", text: "Rooms remember the people who fled them." },
  { title: "Unreal Engine 5", text: "Lumen lighting, Nanite detail and a cinematic camera." },
];

export function Features() {
  return (
    <Section id="features" className="bg-card">
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <SectionHeading
          eyebrow="Gameplay"
          title="Every system serves the tension"
          description="Each mechanic exists to make the world feel real and the next street feel dangerous."
        />
        <dl className="grid gap-x-12 sm:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 2) * 0.05}>
              <div className="border-t border-border py-7">
                <dt className="font-display text-2xl font-bold uppercase text-foreground">
                  {f.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {f.text}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </Section>
  );
}
