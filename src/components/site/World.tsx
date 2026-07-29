import { motion } from "framer-motion";
import hospital from "@/assets/world-hospital.jpg";
import military from "@/assets/world-military.jpg";
import forest from "@/assets/world-forest.jpg";
import lab from "@/assets/world-lab.jpg";
import metro from "@/assets/world-metro.jpg";
import highway from "@/assets/gallery-highway.jpg";
import { Reveal, Section, SectionHeading } from "./primitives";

const places = [
  {
    index: "01",
    name: "St. Mercy Hospital",
    image: hospital,
    text: "Triage tents in the car park, corridors sealed in plastic. The first place that understood what was coming, and the first to fall.",
  },
  {
    index: "02",
    name: "Checkpoint Delta",
    image: military,
    text: "Floodlights, sandbags and a queue of cars that never moves. The army is still following orders. For now.",
  },
  {
    index: "03",
    name: "The Highway",
    image: highway,
    text: "Forty kilometres of abandoned evacuation. Burning vehicles mark where the panic finally caught up.",
  },
  {
    index: "04",
    name: "Blackpine Forest",
    image: forest,
    text: "Cold fog, no signal, no lights. The quietest place in the country and the easiest place to disappear.",
  },
  {
    index: "05",
    name: "Line 4 — Abandoned Metro",
    image: metro,
    text: "Power is gone below ground. Your flashlight is a promise you make to whatever is already down there.",
  },
  {
    index: "06",
    name: "Facility Two",
    image: lab,
    text: "It is not on any map. It has your government's seal on the door. It has answers you may not survive reading.",
  },
];

export function World() {
  return (
    <Section id="world" className="hairline">
      <SectionHeading
        eyebrow="The World"
        title="Seven regions. One collapsing night."
        description="Locations built to be believed before they are feared — real architecture, real light, real silence."
      />

      <div className="mt-24 space-y-28 md:space-y-40">
        {places.map((p, i) => (
          <div
            key={p.name}
            className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
              i % 2 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Reveal>
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1600}
                  height={1008}
                  className="aspect-16/10 w-full object-cover brightness-[0.85] transition-all duration-[1400ms] group-hover:brightness-100"
                />
                <span className="absolute left-0 top-0 bg-background/70 px-4 py-2 font-display text-xs tracking-[0.3em] text-blood-bright">
                  {p.index}
                </span>
              </motion.div>
            </Reveal>
            <div className="max-w-lg">
              <Reveal delay={0.1}>
                <h3 className="font-display text-3xl uppercase leading-tight tracking-[0.06em] text-foreground md:text-5xl">
                  {p.name}
                </h3>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {p.text}
                </p>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}