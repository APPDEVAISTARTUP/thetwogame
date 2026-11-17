import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import highway from "@/assets/gallery-highway.jpg";
import gas from "@/assets/gallery-gas.jpg";
import safehouse from "@/assets/gallery-safehouse.jpg";
import police from "@/assets/gallery-police.jpg";
import metro from "@/assets/world-metro.jpg";
import hospital from "@/assets/world-hospital.jpg";
import { cn } from "@/lib/utils";
import { Reveal, Section, SectionHeading } from "./primitives";

const shots = [
  { src: highway, alt: "Burning vehicles on a destroyed highway" },
  { src: gas, alt: "Rain-soaked petrol pump at night" },
  { src: police, alt: "Police blockade in a town square" },
  { src: metro, alt: "Abandoned metro platform in darkness" },
  { src: safehouse, alt: "Candle-lit safehouse interior" },
  { src: hospital, alt: "Overwhelmed hospital corridor" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % shots.length));
      if (e.key === "ArrowLeft")
        setActive((i) => (i === null ? i : (i - 1 + shots.length) % shots.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <Section id="gallery" className="hairline">
      <SectionHeading
        eyebrow="Gallery"
        title="Captured in engine"
        description="Work-in-progress captures from the current development build."
      />

      <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {shots.map((s, i) => (
          <Reveal
            key={s.alt}
            delay={(i % 3) * 0.05}
            className={cn(i === 0 && "col-span-2 row-span-2")}
          >
            <button
              onClick={() => setActive(i)}
              className="group relative block h-full w-full overflow-hidden"
              aria-label={`Open screenshot: ${s.alt}`}
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="aspect-16/10 h-full w-full object-cover saturate-[1.3] contrast-[1.08] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
              />
              <span
                aria-hidden
                className="absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-blood-bright"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-blood-bright px-4 py-2 text-left font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white transition-transform duration-300 group-hover:translate-y-0">
                {s.alt}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={shots[active].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 md:p-10"
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 p-3 text-foreground/70 hover:text-foreground"
            >
              <X size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((active - 1 + shots.length) % shots.length);
              }}
              aria-label="Previous screenshot"
              className="absolute left-2 p-3 text-foreground/70 hover:text-foreground md:left-6"
            >
              <ChevronLeft size={32} />
            </button>
            <motion.img
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={shots[active].src}
              alt={shots[active].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-auto max-w-full object-contain"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((active + 1) % shots.length);
              }}
              aria-label="Next screenshot"
              className="absolute right-2 p-3 text-foreground/70 hover:text-foreground md:right-6"
            >
              <ChevronRight size={32} />
            </button>
            <p className="absolute bottom-5 left-0 right-0 text-center font-mono text-xs uppercase tracking-[0.16em] text-foreground/60">
              {shots[active].alt} · {active + 1}/{shots.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
