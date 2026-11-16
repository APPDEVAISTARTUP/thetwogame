import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import heroCity from "@/assets/hero-city.jpg";
import { buttonClass } from "./primitives";

/** Scroll progress at which the camera has fully passed through the "O". */
const THROUGH = 0.6;
const MAX_ZOOM = 80;
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Signature: the city is only visible through the letters T-W-O. Scrolling pushes the
 * camera through the "O" until the letters are gone and you are standing in the street.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const maskG = useRef<SVGGElement>(null);
  const lineG = useRef<SVGGElement>(null);
  const origin = useRef({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const apply = useCallback(
    (p: number) => {
      const t = Math.min(1, Math.max(0, p / THROUGH));
      // Exponential zoom reads as constant camera speed.
      const s = reduce ? 1 : Math.pow(MAX_ZOOM, t);
      const { x, y } = origin.current;
      const transform = `translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`;
      maskG.current?.setAttribute("transform", transform);
      lineG.current?.setAttribute("transform", transform);
    },
    [reduce],
  );

  useMotionValueEvent(scrollYProgress, "change", apply);

  useEffect(() => {
    const measure = () => {
      const text = textRef.current;
      const svg = svgRef.current;
      if (!text || !svg) return;
      try {
        const o = text.getExtentOfChar(2);
        origin.current = { x: o.x + o.width / 2, y: svg.clientHeight * 0.42 };
      } catch {
        origin.current = { x: svg.clientWidth * 0.68, y: svg.clientHeight * 0.42 };
      }
      apply(scrollYProgress.get());
    };
    measure();
    void document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [apply, scrollYProgress]);

  // Function transforms on purpose: range transforms of a targeted scroll progress can be
  // handed to a native scroll timeline that tracks the whole document instead of this section.
  const ramp = (p: number, from: number, to: number) =>
    Math.min(1, Math.max(0, (p - from) / (to - from)));
  const introOpacity = useTransform(scrollYProgress, (p) => 1 - ramp(p, 0, 0.1));
  const introEvents = useTransform(scrollYProgress, (p) => (p > 0.08 ? "none" : "auto"));
  const plateOpacity = useTransform(scrollYProgress, (p) => 1 - ramp(p, THROUGH - 0.14, THROUGH));
  const outroOpacity = useTransform(scrollYProgress, (p) => ramp(p, THROUGH, THROUGH + 0.16));
  const outroY = useTransform(scrollYProgress, (p) => 28 * (1 - ramp(p, THROUGH, THROUGH + 0.16)));
  const imageScale = useTransform(scrollYProgress, (p) => 1.16 - 0.16 * p);

  const letters = {
    x: "50%",
    y: "42%",
    textAnchor: "middle" as const,
    dominantBaseline: "central" as const,
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: "min(50vw, 56svh)",
      letterSpacing: "-0.01em",
    },
  };

  return (
    <section
      id="top"
      ref={ref}
      aria-label="TWO"
      data-night="21:00"
      data-night-end="21:30"
      className={reduce ? "relative h-[100svh]" : "relative h-[280svh]"}
    >
      <div className="sticky top-0 h-[100svh] min-h-[600px] overflow-hidden bg-black">
        <motion.img
          src={heroCity}
          alt="Rain-soaked Indian city street collapsing during the first hours of the outbreak"
          width={1920}
          height={1088}
          fetchPriority="high"
          style={{ scale: reduce ? 1 : imageScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden className="film-grain absolute inset-0 opacity-25" />

        {/* The plate: solid night with T-W-O cut out of it. */}
        <motion.svg
          ref={svgRef}
          aria-hidden
          style={{ opacity: plateOpacity }}
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <mask id="two-cutout">
              <rect width="100%" height="100%" fill="white" />
              <g ref={maskG}>
                <text ref={textRef} {...letters} fill="black">
                  TWO
                </text>
              </g>
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="var(--background)" mask="url(#two-cutout)" />
          <g ref={lineG} fill="none" strokeWidth={1.5}>
            <text {...letters}>
              <tspan stroke="color-mix(in oklab, var(--foreground) 22%, transparent)">TW</tspan>
              <tspan stroke="var(--color-blood-bright)">O</tspan>
            </text>
          </g>
        </motion.svg>

        {/* First frame: what the game is and what to do. */}
        <motion.div
          style={{ opacity: introOpacity, pointerEvents: introEvents }}
          className="absolute inset-x-0 bottom-0 z-10 pb-[9svh]"
        >
          <div className="container-x flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease }}
            >
              <h1 className="max-w-xl font-display text-4xl font-extrabold uppercase leading-[0.92] text-foreground md:text-5xl">
                Survive the first night of the outbreak.
              </h1>
              <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-foreground/60">
                Open-world zombie survival · Set in India · Unreal Engine 5 · PC
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.7, ease }}
              className="flex flex-col gap-4 md:items-end"
            >
              <div className="flex flex-wrap gap-3">
                <a href="#waitlist" className={buttonClass("primary")}>
                  Join the waitlist
                </a>
                <Link to="/support" className={buttonClass("outline")}>
                  Support development
                </Link>
              </div>
              {!reduce && (
                <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-sodium">
                  <ArrowDown size={13} className="animate-bounce" /> Scroll to enter the city
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* After the camera is through the O. */}
        <motion.div
          aria-hidden={reduce ? true : undefined}
          style={{ opacity: outroOpacity }}
          className="pointer-events-none absolute inset-0 z-10"
        >
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
          <motion.div
            style={{ y: outroY }}
            className="container-x absolute inset-x-0 bottom-[12svh]"
          >
            <span className="eyebrow">21:00 · Day 01</span>
            <p className="display-xl mt-4 max-w-5xl text-foreground">
              The 9 o&rsquo;clock bulletin is still on air.
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/75 md:text-lg">
              Nobody understands what is happening yet. Everybody believes it will be over by
              morning.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
