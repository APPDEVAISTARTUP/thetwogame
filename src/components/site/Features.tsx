import { ArrowUpRight } from "lucide-react";
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
    <Section id="features" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] top-0 h-[70%] w-[70%] rounded-full bg-blood/25 blur-[160px]"
      />
      <div className="relative">
        <SectionHeading
          eyebrow="Gameplay"
          title="Every system serves the tension"
          description="Each mechanic exists to make the world feel real and the next street feel dangerous."
        />
        <div className="mt-16 border-t border-foreground/15">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.04}>
              <div className="group relative grid cursor-default items-center gap-x-10 gap-y-2 overflow-hidden border-b border-foreground/15 px-2 py-7 md:grid-cols-[1.1fr_1fr_auto] md:px-6 md:py-9">
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-blood-bright transition-transform duration-500 ease-out group-hover:scale-y-100"
                />
                <h3 className="relative font-display text-4xl font-black uppercase leading-none text-foreground transition-transform duration-500 group-hover:translate-x-3 md:text-7xl">
                  {f.title}
                </h3>
                <p className="relative max-w-md text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-white md:text-lg">
                  {f.text}
                </p>
                <ArrowUpRight
                  aria-hidden
                  className="relative hidden h-10 w-10 -translate-x-4 text-white opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:block"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
