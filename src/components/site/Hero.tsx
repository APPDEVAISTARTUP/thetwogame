import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import heroCity from "@/assets/hero-city.jpg";
import wordmark from "@/assets/two-wordmark.png";
import { buttonClass } from "./primitives";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Signature: the page opens like a film. Black letterbox bars cover the frame and part
 * to a widescreen strip, then the title and calls to action fade in.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);

  return (
    <section
      id="top"
      ref={ref}
      aria-label="TWO"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-black"
    >
      <motion.img
        src={heroCity}
        alt="Rain-soaked Indian city street collapsing during the first hours of the outbreak"
        width={1920}
        height={1088}
        style={{ y }}
        initial={{ scale: reduce ? 1 : 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-background/40" />
      <div className="absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-transparent" />

      {/* letterbox bars */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1/2 origin-top bg-black"
        style={{ animation: "letterbox-open 1.6s cubic-bezier(0.7,0,0.2,1) 0.2s both" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-black"
        style={{ animation: "letterbox-open 1.6s cubic-bezier(0.7,0,0.2,1) 0.2s both" }}
      />

      <div className="container-x relative z-10 flex h-full flex-col justify-end pb-[14svh] md:pb-[15svh]">
        <motion.img
          src={wordmark}
          alt="TWO"
          width={633}
          height={331}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.3, ease }}
          className="w-[min(62vw,340px)] drop-shadow-[0_8px_40px_rgba(0,0,0,0.7)]"
        />
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.55, ease }}
          className="mt-6 max-w-2xl font-display text-4xl font-extrabold uppercase leading-[0.92] text-foreground md:text-6xl"
        >
          Survive the first night of the outbreak.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-5 max-w-lg text-base leading-relaxed text-foreground/75 md:text-lg"
        >
          An open-world zombie survival game set in an Indian city, built in Unreal Engine 5 by one
          developer.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.95, ease }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a href="#waitlist" className={buttonClass("primary")}>
            Join the waitlist
          </a>
          <Link to="/support" className={buttonClass("outline")}>
            Support development
          </Link>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-10 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground/55"
        >
          PC · Unreal Engine 5 · In development · Trailer coming soon
        </motion.p>
      </div>
    </section>
  );
}
