import { Backpack, Compass, Crosshair, Eye, Hammer, Map, ScrollText, Sparkles } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

const features = [
  {
    icon: Map,
    title: "Open World",
    text: "A single continuous city and countryside, no loading walls.",
  },
  {
    icon: Crosshair,
    title: "Zombie Survival",
    text: "Grounded threat design. No superpowers, no arcade waves.",
  },
  {
    icon: Compass,
    title: "Dynamic Combat",
    text: "Weight, stamina and consequence in every encounter.",
  },
  {
    icon: Eye,
    title: "Immersive Exploration",
    text: "Silence, light and sound guide you — not waypoints.",
  },
  {
    icon: Backpack,
    title: "Inventory",
    text: "Space is scarce. What you carry is what you become.",
  },
  { icon: Hammer, title: "Crafting", text: "Improvise from what a collapsing city leaves behind." },
  {
    icon: ScrollText,
    title: "Environmental Storytelling",
    text: "Rooms remember the people who fled them.",
  },
  {
    icon: Sparkles,
    title: "AAA Visuals",
    text: "Unreal Engine 5, Lumen and Nanite, cinematic grading.",
  },
];

export function Features() {
  return (
    <Section id="features" className="hairline">
      <SectionHeading
        eyebrow="Gameplay"
        title="Every system serves the tension"
        description="No clutter. No filler. Each mechanic exists to make the world feel real and the next street feel dangerous."
      />

      <div className="mt-20 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={(i % 4) * 0.07}>
            <div className="group relative h-full overflow-hidden bg-background p-8 transition-colors duration-500 hover:bg-card md:p-10">
              <span className="absolute inset-x-0 top-0 h-px w-0 bg-blood transition-all duration-700 group-hover:w-full" />
              <span className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blood/0 blur-3xl transition-all duration-700 group-hover:bg-blood/25" />
              <f.icon
                size={22}
                className="text-muted-foreground transition-all duration-500 group-hover:-translate-y-0.5 group-hover:text-blood-bright"
              />
              <h3 className="mt-8 font-display text-xl uppercase tracking-[0.12em] text-foreground transition-transform duration-500 group-hover:translate-x-0.5">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
