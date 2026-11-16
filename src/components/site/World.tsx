import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import hospital from "@/assets/world-hospital.jpg";
import military from "@/assets/world-military.jpg";
import forest from "@/assets/world-forest.jpg";
import lab from "@/assets/world-lab.jpg";
import metro from "@/assets/world-metro.jpg";
import highway from "@/assets/gallery-highway.jpg";
import { Section, SectionHeading } from "./primitives";

const places = [
  {
    name: "Civil Hospital, Sector 9",
    image: hospital,
    text: "Triage tents in the parking lot and corridors sealed in blue tarp. The first place that understood what was coming, and the first to fall.",
  },
  {
    name: "NH-48 Army Checkpost",
    image: military,
    text: "Floodlights, sandbags and a queue of trucks that never moves. The jawans are still following orders. For now.",
  },
  {
    name: "The Expressway",
    image: highway,
    text: "Forty kilometres of abandoned evacuation. The dhabas are still lit, and nobody is inside them.",
  },
  {
    name: "Sal Forest, Outer Belt",
    image: forest,
    text: "Cold fog off the river, no signal, no lights. The easiest place in the country to disappear.",
  },
  {
    name: "Metro Line 4",
    image: metro,
    text: "The third rail is dead and luggage is still on the platform. Your flashlight is the only light down here.",
  },
  {
    name: "Facility Two",
    image: lab,
    text: "It is not on any map. It has answers you may not survive reading.",
  },
];

export function World() {
  const track = useRef<HTMLUListElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <Section id="world">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          eyebrow="The world"
          title="One Indian city. One collapsing night."
          description="Places built to be believed before they are feared."
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous location"
            className="flex h-12 w-12 items-center justify-center border border-foreground/25 text-foreground transition-colors hover:border-foreground"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next location"
            className="flex h-12 w-12 items-center justify-center border border-foreground/25 text-foreground transition-colors hover:border-foreground"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        className="-mx-6 mt-14 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto scroll-smooth px-6 lg:scroll-px-14 pb-4 [scrollbar-width:none] lg:-mx-14 lg:px-14 [&::-webkit-scrollbar]:hidden"
      >
        {places.map((p) => (
          <li
            key={p.name}
            className="w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[min(42vw,620px)]"
          >
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              width={1600}
              height={1008}
              className="aspect-16/10 w-full object-cover"
            />
            <h3 className="mt-6 font-display text-3xl font-bold uppercase text-foreground md:text-4xl">
              {p.name}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              {p.text}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
