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
    name: "Civil Hospital, Sector 9",
    image: hospital,
    text: "Triage tents in the parking lot, corridors sealed in blue tarp, ambulances stacked at the gate. The first place that understood what was coming, and the first to fall.",
  },
  {
    index: "02",
    name: "NH-48 Army Checkpost",
    image: military,
    text: "Floodlights, sandbags and a queue of trucks that never moves. Jawans are still following orders. For now.",
  },
  {
    index: "03",
    name: "The Expressway",
    image: highway,
    text: "Forty kilometres of abandoned evacuation — buses, autos, a burning tanker. The dhabas are still lit, and nobody is inside them.",
  },
  {
    index: "04",
    name: "Sal Forest, Outer Belt",
    image: forest,
    text: "Cold fog off the river, no signal, no lights. A forgotten forest shrine and the easiest place in the country to disappear.",
  },
  {
    index: "05",
    name: "Metro Line 4 — Below Ground",
    image: metro,
    text: "Third rail is dead, station shutters half-down, luggage still on the platform. Your flashlight is a promise you make to whatever is already down there.",
  },
  {
    index: "06",
    name: "Facility Two — Restricted",
    image: lab,
    text: "It is not on any map. It carries a national emblem on the door. It has answers you may not survive reading.",
  },
];

export function World() {
  return (
    <Section id="world" className="hairline">
      <SectionHeading
        eyebrow="The World"
        title="One Indian city. One collapsing night."
        description="Locations built to be believed before they are feared — Indian streets, Indian light, Indian silence."
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
