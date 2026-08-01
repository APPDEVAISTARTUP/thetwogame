import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Play } from "lucide-react";
import heroCity from "@/assets/hero-city.jpg";
import wordmark from "@/assets/two-wordmark.png";
import { CinematicButton } from "./primitives";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div
      id="top"
      ref={ref}
      className="relative grain vignette h-[100svh] min-h-[680px] overflow-hidden"
    >
      <motion.img
        src={heroCity}
        alt="Rain-soaked city street collapsing during the first hours of the outbreak"
        width={1920}
        height={1088}
        style={{ y }}
        className="absolute inset-0 h-[118%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-background/85 via-background/35 to-background" />
      <div className="absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-background/50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />

      <motion.div
        style={{ opacity }}
        className="container-x relative flex h-full flex-col justify-center pt-28 pb-32"
      >
        <motion.img
          src={wordmark}
          alt="TWO game logo"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-[min(58vw,320px)] max-w-full"
          width={633}
          height={331}
        />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="display-xl text-balance-tight mt-4 max-w-4xl text-foreground [text-shadow:0_2px_40px_rgba(0,0,0,0.6)]"
        >
          Open World
          <br />
          <span className="text-blood-bright">Zombie Survival</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 max-w-xl font-display text-lg uppercase tracking-[0.2em] text-foreground/90 md:text-xl"
        >
          Experience the beginning of the outbreak.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          A cinematic open-world zombie survival game built by a solo developer in India using
          Unreal Engine 5.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a href="#waitlist">
            <CinematicButton>Join Waitlist</CinematicButton>
          </a>
          <a href="/support">
            <CinematicButton variant="outline">Support TWO</CinematicButton>
          </a>
          <CinematicButton variant="ghost" disabled>
            <Play size={14} /> Trailer — Coming Soon
          </CinematicButton>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute inset-x-0 bottom-8 hidden flex-col items-center gap-3 md:flex"
      >
        <span className="eyebrow text-[0.6rem]">Scroll</span>
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
