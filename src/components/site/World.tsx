import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import hospital from "@/assets/world-hospital.jpg";
import military from "@/assets/world-military.jpg";
import forest from "@/assets/world-forest.jpg";
import metro from "@/assets/world-metro.jpg";
import highway from "@/assets/gallery-highway.jpg";
import { cn } from "@/lib/utils";

/** The night, in order. Times are what the clock in the corner reads as you pass each place. */
const places = [
  {
    time: "22:10",
    name: "Civil Hospital, Sector 9",
    image: hospital,
    text: "Triage tents in the parking lot and corridors sealed in blue tarp. The first place that understood what was coming, and the first to fall.",
  },
  {
    time: "23:30",
    name: "NH-48 Army Checkpost",
    image: military,
    text: "Floodlights, sandbags and a queue of trucks that never moves. The jawans are still following orders. For now.",
  },
  {
    time: "00:45",
    name: "The Expressway",
    image: highway,
    text: "Forty kilometres of abandoned evacuation. The dhabas are still lit, and nobody is inside them.",
  },
  {
    time: "02:00",
    name: "Sal Forest, Outer Belt",
    image: forest,
    text: "Cold fog off the river, no signal, no lights. The easiest place in the country to disappear.",
  },
  {
    time: "03:15",
    name: "Metro Line 4",
    image: metro,
    text: "The third rail is dead and luggage is still on the platform. Whatever is down here was here before you.",
  },
];

function Intro() {
  return (
    <div className="w-[84vw] shrink-0 self-center md:w-[34rem]">
      <span className="eyebrow">The world</span>
      <h2 className="display-xl mt-5 text-foreground">
        One city.
        <br />
        One night.
      </h2>
      <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground md:text-lg">
        Five places you will cross before sunrise, in the order the night takes you through them.
      </p>
    </div>
  );
}

function Place({ place }: { place: (typeof places)[number] }) {
  return (
    <article className="group w-[84vw] shrink-0 md:w-auto">
      <div className="relative aspect-4/5 w-full overflow-hidden md:aspect-16/10 md:h-[54svh] md:w-auto">
        <img
          src={place.image}
          alt={place.name}
          loading="lazy"
          width={1600}
          height={1008}
          className="h-full w-full object-cover saturate-[1.3] contrast-[1.08] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-blood/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span className="absolute left-0 top-0 bg-blood-bright px-4 py-2 font-mono text-sm font-medium tabular-nums tracking-[0.12em] text-white">
          {place.time}
        </span>
      </div>
      <h3 className="mt-6 font-display text-3xl font-extrabold uppercase leading-none text-foreground md:text-5xl">
        {place.name}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
        {place.text}
      </p>
    </article>
  );
}

export function World() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const travel = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = track.current;
    if (!el || reduce) return;
    const measure = () => {
      const d = Math.max(0, el.scrollWidth - window.innerWidth);
      setDistance(d);
      travel.set(d);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduce, travel]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform([scrollYProgress, travel], ([p, d]: number[]) => -d * p);
  const progress = useTransform(scrollYProgress, (p) => `${p * 100}%`);

  const trackClass = "flex items-start gap-8 px-6 md:gap-14 lg:px-14";

  if (reduce) {
    return (
      <section id="world" data-night="22:10" className="scroll-mt-20 py-24 md:py-36">
        <div className={cn(trackClass, "overflow-x-auto pb-6")}>
          <Intro />
          {places.map((p) => (
            <Place key={p.name} place={p} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="world"
      ref={ref}
      data-night="22:10"
      data-night-end="03:15"
      style={{ height: `calc(100svh + ${distance}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[15%] bottom-0 h-[60%] w-[60%] rounded-full bg-blood/20 blur-[160px]"
        />
        <motion.div ref={track} style={{ x }} className={cn(trackClass, "w-max")}>
          <Intro />
          {places.map((p) => (
            <Place key={p.name} place={p} />
          ))}
          <div aria-hidden className="w-[10vw] shrink-0" />
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-x-6 bottom-14 h-px bg-foreground/10 lg:inset-x-14"
        >
          <motion.div style={{ width: progress }} className="h-px bg-sodium" />
        </div>
      </div>
    </section>
  );
}
