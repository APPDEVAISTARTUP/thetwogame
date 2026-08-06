import survivor from "@/assets/about-survivor.jpg";
import { CinematicButton, Reveal } from "./primitives";

const stats = [
  { value: "72h", label: "Since patient zero" },
  { value: "1", label: "Solo developer" },
  { value: "UE5", label: "Unreal Engine" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-28 md:py-40">
      {/* full-bleed cinematic plate */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block">
        <img
          src={survivor}
          alt="Weathered survivor holding a flashlight in the rain"
          loading="lazy"
          width={1408}
          height={1600}
          className="h-full w-full object-cover brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background" />
      </div>

      <div className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_0.9fr]">
        <div>
          <div className="flex items-start gap-6">
            <span className="hidden whitespace-nowrap font-display text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground [writing-mode:vertical-rl] lg:block">
              Mission Objective
            </span>
            <div>
              <Reveal>
                <h2 className="display-lg text-balance-tight text-foreground">
                  India is falling. Tonight.
                </h2>
              </Reveal>
          <div className="mt-8 max-w-xl space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
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

          <Reveal delay={0.2}>
            <a href="#waitlist" className="mt-10 inline-block">
              <CinematicButton variant="pill">Join Waitlist</CinematicButton>
            </a>
          </Reveal>

          <div className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-10">
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
        </div>

        <Reveal className="lg:hidden">
          <div className="relative overflow-hidden">
            <img
              src={survivor}
              alt="Weathered survivor holding a flashlight in the rain"
              loading="lazy"
              width={1408}
              height={1600}
              className="aspect-4/5 w-full object-cover brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
