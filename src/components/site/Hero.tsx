import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import heroPoster from "@/assets/hero-poster.webp";
import heroCity from "@/assets/hero-city.jpg";
import { buttonClass } from "./primitives";

/** Scroll progress at which the camera has fully passed through the "O". */
const THROUGH = 0.6;
const MAX_ZOOM = 22;
const ease = [0.16, 1, 0.3, 1] as const;

/** Poster geometry: intrinsic size, crop focus (centre of the TWO logo) and centre of the red O. */
const POSTER = { w: 1671, h: 941 };
const FOCUS = { x: 0.507, y: 0.3 };
const O_CENTER = { x: 0.628, y: 0.289 };

/** In-world headlines for the 9 o'clock bulletin running under the hero. */
const BULLETIN = [
  "Civil Hospital Sector 9 stops admitting patients",
  "NH-48 closed in both directions",
  "Metro Line 4 services suspended until further notice",
  "Residents advised to stay indoors and lock all shutters",
  "Army checkposts set up on the outer ring road",
  "Do not approach anyone who appears injured",
];

/**
 * Signature: the key art fills the screen. Scrolling pushes the camera through the red "O"
 * of the logo until the poster is gone and you are standing in the city street.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState("62.8% 28.9%");
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // object-cover crops the poster, so find where the O actually lands inside the frame.
  useEffect(() => {
    const measure = () => {
      const el = frameRef.current;
      if (!el) return;
      const W = el.clientWidth;
      const H = el.clientHeight;
      const k = Math.max(W / POSTER.w, H / POSTER.h);
      const dw = POSTER.w * k;
      const dh = POSTER.h * k;
      const x = (W - dw) * FOCUS.x + dw * O_CENTER.x;
      const y = (H - dh) * FOCUS.y + dh * O_CENTER.y;
      setOrigin(`${x}px ${y}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Function transforms on purpose: range transforms of a targeted scroll progress can be
  // handed to a native scroll timeline that tracks the whole document instead of this section.
  const ramp = (p: number, from: number, to: number) =>
    Math.min(1, Math.max(0, (p - from) / (to - from)));
  const posterScale = useTransform(scrollYProgress, (p) =>
    reduce ? 1 : Math.pow(MAX_ZOOM, ramp(p, 0, THROUGH)),
  );
  const posterOpacity = useTransform(scrollYProgress, (p) => 1 - ramp(p, THROUGH - 0.12, THROUGH));
  const cityScale = useTransform(scrollYProgress, (p) => 1.3 - 0.3 * ramp(p, THROUGH - 0.15, 1));
  const cityOpacity = useTransform(scrollYProgress, (p) => ramp(p, THROUGH - 0.25, THROUGH - 0.05));
  const introOpacity = useTransform(scrollYProgress, (p) => 1 - ramp(p, 0, 0.1));
  const introEvents = useTransform(scrollYProgress, (p) => (p > 0.08 ? "none" : "auto"));
  const outroOpacity = useTransform(scrollYProgress, (p) => ramp(p, THROUGH, THROUGH + 0.16));
  const outroY = useTransform(scrollYProgress, (p) => 28 * (1 - ramp(p, THROUGH, THROUGH + 0.16)));

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
        {/* The street waiting on the other side of the O. */}
        <motion.img
          src={heroCity}
          alt=""
          aria-hidden
          width={1920}
          height={1088}
          style={{ scale: reduce ? 1 : cityScale, opacity: reduce ? 0 : cityOpacity }}
          className="absolute inset-0 h-full w-full object-cover saturate-[1.2] contrast-[1.1]"
        />

        {/* Key art. Mobile keeps the logo in frame by giving the poster the top of the screen. */}
        <motion.div
          ref={frameRef}
          style={{ scale: posterScale, opacity: posterOpacity, transformOrigin: origin }}
          className="absolute inset-x-0 top-14 h-[60svh] overflow-hidden bg-black will-change-transform md:inset-0 md:h-full"
        >
          <motion.img
            src={heroPoster}
            alt="TWO key art: a lone survivor faces a rain-soaked city at night under the TWO logo"
            width={POSTER.w}
            height={POSTER.h}
            fetchPriority="high"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease }}
            style={{ objectPosition: `${FOCUS.x * 100}% ${FOCUS.y * 100}%` }}
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-black via-black/50 to-transparent"
          />
        </motion.div>

        {/* First frame: what the game is and what to do. */}
        <motion.div
          style={{ opacity: introOpacity, pointerEvents: introEvents }}
          className="absolute inset-x-0 bottom-0 z-10"
        >
          <div className="container-x flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease }}
            >
              <h1 className="max-w-xl font-display text-3xl font-black uppercase leading-[0.92] text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.9)] md:text-5xl">
                Survive the first night of the outbreak.
              </h1>
              <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/85">
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

          {/* The bulletin that is "still on air": a live news ticker. */}
          <div
            aria-hidden
            className="mt-6 flex items-stretch border-t-2 border-blood-bright bg-black/85"
          >
            <span className="flex shrink-0 items-center gap-2 bg-blood-bright px-4 py-2.5 font-display text-sm font-extrabold uppercase tracking-[0.08em] text-white md:px-6">
              <span
                className="h-2 w-2 rounded-full bg-white"
                style={{ animation: "hud-blink 1.2s ease-in-out infinite" }}
              />
              Breaking
            </span>
            <div className="relative flex-1 overflow-hidden">
              <div
                className="flex w-max items-center gap-10 whitespace-nowrap py-2.5 pl-10"
                style={{ animation: "marquee-x 46s linear infinite" }}
              >
                {[...BULLETIN, ...BULLETIN].map((line, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.12em] text-white"
                  >
                    {line}
                    <span className="h-1.5 w-1.5 rotate-45 bg-blood-bright" />
                  </span>
                ))}
              </div>
            </div>
            <span className="hidden shrink-0 items-center px-6 font-mono text-xs tabular-nums tracking-[0.12em] text-sodium md:flex">
              21:00 IST
            </span>
          </div>
        </motion.div>

        {/* After the camera is through the O. */}
        <motion.div
          aria-hidden={reduce ? true : undefined}
          style={{ opacity: outroOpacity }}
          className="pointer-events-none absolute inset-0 z-10"
        >
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent" />
          <motion.div
            style={{ y: outroY }}
            className="container-x absolute inset-x-0 bottom-[12svh]"
          >
            <span className="eyebrow">21:00 · Day 01</span>
            <p className="display-xl mt-4 max-w-5xl text-white">
              The 9 o&rsquo;clock bulletin is still on air.
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 md:text-lg">
              Nobody understands what is happening yet. Everybody believes it will be over by
              morning.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
