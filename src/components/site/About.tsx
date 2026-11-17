import survivor from "@/assets/about-survivor.jpg";
import { Reveal, Section } from "./primitives";

export function About() {
  return (
    <Section id="about" night="21:40">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <Reveal className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 bg-blood-bright/30 blur-[90px]"
            style={{ animation: "ember-pulse 4s ease-in-out infinite" }}
          />
          <img
            src={survivor}
            alt="A weathered survivor holding a flashlight in the rain"
            loading="lazy"
            width={1408}
            height={1600}
            className="relative aspect-4/5 w-full object-cover saturate-[1.25] contrast-[1.08]"
          />
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">21:40 · The story</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-xl mt-5 text-foreground">
              India is falling.
              <br />
              <span className="text-blood-bright">Tonight.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-10 max-w-xl space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                There is no wasteland yet. Sodium streetlights still hum over the flyover. A news
                anchor is still reading the 9 o&rsquo;clock bulletin. TWO drops you into the first
                hours of the collapse in an Indian city — when nobody understands what is happening
                and everybody believes it will be over by morning.
              </p>
              <p>
                You are not a soldier. You are not immune. You are one more person stuck between a
                blocked highway and a sealed colony gate. Every bullet is counted, every shutter is
                a decision, every stranger is a risk.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
