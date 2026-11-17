import lab from "@/assets/world-lab.jpg";
import { Section } from "./primitives";

export function Facility() {
  return (
    <Section id="facility">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <img
          src={lab}
          alt="A sealed research facility corridor"
          loading="lazy"
          width={1600}
          height={1008}
          className="aspect-16/10 w-full object-cover"
        />
        <div>
          <span className="eyebrow">Restricted</span>
          <h2 className="display-lg mt-5 text-white">Facility Two</h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            It is not on any map. It carries a national emblem on the door. It has answers you may
            not survive reading.
          </p>
        </div>
      </div>
    </Section>
  );
}
