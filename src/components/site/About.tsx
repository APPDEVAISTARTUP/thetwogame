import survivor from "@/assets/about-survivor.jpg";
import { Reveal, Section, SectionHeading } from "./primitives";

const stats = [
  { value: "72h", label: "Since patient zero" },
  { value: "1", label: "Solo developer" },
  { value: "UE5", label: "Unreal Engine" },
];

export function About() {
  return (
    <Section id="about" className="hairline">
      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        <Reveal className="order-2 lg:order-1">
          <div className="group relative overflow-hidden">
            <img
              src={survivor}
              alt="Weathered survivor holding a flashlight in the rain"
              loading="lazy"
              width={1408}
              height={1600}
              className="aspect-4/5 w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow="The Story" title="India is falling. Tonight." />
          <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              There is no wasteland yet. Sodium streetlights still hum over the flyover. A news
              anchor is still reading the 9 o'clock bulletin. A temple bell rings somewhere in an
              empty lane. TWO drops you into the first hours of the collapse in an Indian city —
              when nobody understands what is happening and everybody believes it will be over by
              morning.
            </p>
            <p>
              You are not a soldier. You are not immune. You are one more person stuck between a
              blocked highway and a sealed colony gate. Every bullet is counted, every shutter is a
              decision, every stranger is a risk. Survive long enough and the truth beneath the
              outbreak begins to surface.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-10">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div>
                  <div className="font-display text-3xl text-blood-bright md:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-2 text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
