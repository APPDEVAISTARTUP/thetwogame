import hospital from "@/assets/world-hospital.jpg";
import military from "@/assets/world-military.jpg";
import forest from "@/assets/world-forest.jpg";
import metro from "@/assets/world-metro.jpg";
import highway from "@/assets/gallery-highway.jpg";
import { Section, SectionHeading } from "./primitives";

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

export function World() {
  return (
    <Section id="world">
      <SectionHeading
        eyebrow="The world"
        title="One city. One night."
        description="Five places you will cross before sunrise, in the order the night takes you through them."
      />
      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place) => (
          <article key={place.name}>
            <div className="relative aspect-16/10 overflow-hidden">
              <img
                src={place.image}
                alt={place.name}
                loading="lazy"
                width={1600}
                height={1008}
                className="h-full w-full object-cover"
              />
              <span className="absolute left-0 top-0 bg-blood-bright px-3 py-1.5 font-mono text-xs font-medium tabular-nums tracking-[0.12em] text-white">
                {place.time}
              </span>
            </div>
            <h3 className="mt-5 font-display text-2xl font-extrabold uppercase leading-none text-white md:text-3xl">
              {place.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              {place.text}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
