import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import highway from "@/assets/gallery-highway.jpg";
import gas from "@/assets/gallery-gas.jpg";
import safehouse from "@/assets/gallery-safehouse.jpg";
import police from "@/assets/gallery-police.jpg";
import metro from "@/assets/world-metro.jpg";
import hospital from "@/assets/world-hospital.jpg";
import { Reveal, Section, SectionHeading } from "./primitives";

const shots = [
  { src: highway, alt: "Burning vehicles on a destroyed highway", span: "md:col-span-2 md:row-span-2" },
  { src: gas, alt: "Rain-soaked gas station at night", span: "" },
  { src: police, alt: "Police blockade in a town square", span: "" },
  { src: metro, alt: "Abandoned metro platform in darkness", span: "md:col-span-2" },
  { src: safehouse, alt: "Candle-lit safehouse interior", span: "" },
  { src: hospital, alt: "Overwhelmed hospital corridor", span: "" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section id="gallery" className="hairline">
      <SectionHeading
        eyebrow="Gallery"
        title="Captured in engine"
        description="Work-in-progress captures from the current development build."
      />

      <div className="mt-20 grid auto-rows-[240px] grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[260px]">
        {shots.map((s, i) => (
          <Reveal key={s.alt} delay={(i % 3) * 0.08} className={s.span}>
            <button
              onClick={() => setActive(i)}
              className="group relative h-full w-full overflow-hidden"
              aria-label={`Open screenshot: ${s.alt}`}
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="h-full w-full object-cover brightness-[0.8] transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:brightness-100"
              />
              <span className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-5 left-5 translate-y-3 text-left font-display text-xs uppercase tracking-[0.24em] text-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {s.alt}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-6 backdrop-blur-md"
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-6 top-6 p-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X size={22} />
            </button>
            <motion.img
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={shots[active].src}
              alt={shots[active].alt}
              className="max-h-[85vh] w-auto max-w-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}