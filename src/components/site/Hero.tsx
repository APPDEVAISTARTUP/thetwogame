import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Play } from "lucide-react";
import heroCity from "@/assets/hero-city.jpg";
import wordmark from "@/assets/two-wordmark.png";
import { CinematicButton } from "./primitives";

const WORDS = ["Open", "World"];
const WORDS_2 = ["Zombie", "Survival"];

const META = [
  { k: "Engine", v: "Unreal Engine 5" },
  { k: "Platform", v: "PC" },
  { k: "Perspective", v: "Third Person" },
  { k: "Build", v: "In Development" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 18,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div id="top" ref={ref} className="relative h-[100svh] min-h-[700px] overflow-hidden">
      {/* film plate */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <motion.img
            src={heroCity}
            alt="Rain-soaked city street collapsing during the first hours of the outbreak"
            width={1920}
            height={1088}
            animate={{ x: tilt.x, y: tilt.y }}
            transition={{ type: "spring", stiffness: 40, damping: 20 }}
            className="h-full w-full scale-[1.06] object-cover"
          />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 grain" />
      <div className="pointer-events-none absolute inset-0 scanlines" />
      <div className="pointer-events-none absolute inset-0 vignette" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/90 via-background/25 to-background" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-background/90 via-background/10 to-background/60" />
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-blood/30 blur-[150px]"
        style={{ animation: "ember-pulse 7s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blood-bright/70 to-transparent"
        style={{ animation: "sweep-y 9s linear infinite" }}
      />
      <div className="pointer-events-none absolute inset-0 letterbox" />

      {/* left rail */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 xl:block">
        <span className="hud-label block origin-left -rotate-90 whitespace-nowrap">
          Shade Studios — Solo Developed in India
        </span>
      </div>

      {/* right release tab */}
      <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="bg-blood px-2 py-6">
          <span className="block whitespace-nowrap font-display text-[0.6rem] uppercase tracking-[0.34em] text-primary-foreground [writing-mode:vertical-rl]">
            In Development — 2026
          </span>
        </div>
      </div>

      <motion.div
        style={{ opacity }}
        className="container-x relative z-10 flex h-full flex-col items-center justify-end pb-24 pt-32 text-center md:justify-center md:pb-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full bg-blood px-6 py-2"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-primary-foreground"
            style={{ animation: "hud-blink 1.8s ease-in-out infinite" }}
          />
          <span className="font-display text-[0.6rem] uppercase tracking-[0.3em] text-primary-foreground">
            Day 01 — Outbreak Begins
          </span>
        </motion.div>

        <motion.img
          src={wordmark}
          alt="TWO game logo"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-[min(38vw,190px)] max-w-full drop-shadow-[0_10px_50px_rgba(0,0,0,0.8)]"
          width={633}
          height={331}
        />

        <h1 className="display-xl mt-6 max-w-5xl text-foreground [text-shadow:0_4px_60px_rgba(0,0,0,0.75)]">
          <span className="block overflow-hidden">
            {WORDS.map((w, i) => (
              <motion.span
                key={w}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.35 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mr-[0.22em] inline-block"
              >
                {w}
              </motion.span>
            ))}
          </span>
          <span className="block overflow-hidden">
            {WORDS_2.map((w, i) => (
              <motion.span
                key={w}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.55 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={
                  i === 0
                    ? "mr-[0.22em] inline-block text-blood-bright"
                    : "mr-[0.22em] inline-block text-outline"
                }
              >
                {w}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 h-px w-full max-w-2xl bg-linear-to-r from-transparent via-blood-bright to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-7 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          Experience the beginning of the outbreak — a cinematic open-world survival game built in
          Unreal Engine 5 by one developer, frame by frame.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.15 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#waitlist">
            <CinematicButton variant="pill">Join Waitlist</CinematicButton>
          </a>
          <a href="/support">
            <CinematicButton
              variant="outline"
              className="rounded-full px-9 py-3 text-[0.7rem] tracking-[0.22em]"
            >
              Support TWO
            </CinematicButton>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full border border-border/80 text-foreground/70 transition-colors duration-500 hover:border-blood-bright hover:text-blood-bright">
            <Play size={16} />
          </span>
          <span className="hud-label text-[0.55rem]">Trailer — Coming Soon</span>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.35 }}
          className="mt-14 hidden w-full max-w-3xl grid-cols-4 gap-px border border-border bg-border md:grid"
        >
          {META.map((m) => (
            <div key={m.k} className="bg-background/70 px-5 py-4 text-left backdrop-blur-sm">
              <dt className="hud-label text-[0.55rem]">{m.k}</dt>
              <dd className="mt-2 font-display text-xs uppercase tracking-[0.18em] text-foreground">
                {m.v}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute inset-x-0 bottom-10 z-10 hidden flex-col items-center gap-3 md:flex"
      >
        <span className="hud-label text-[0.55rem]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="text-muted-foreground"
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>
    </div>
  );
}
