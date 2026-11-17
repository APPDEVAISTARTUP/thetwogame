import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const LINE_A = "You are not a soldier — You are not immune — ";
const LINE_B = "Every bullet is counted — Every stranger is a risk — ";

/** A red band of oversized type that slides sideways as you scroll past it. */
export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const left = useTransform(scrollYProgress, (p) => (reduce ? "-10%" : `${-5 - p * 30}%`));
  const right = useTransform(scrollYProgress, (p) => (reduce ? "-20%" : `${-35 + p * 30}%`));
  const row =
    "whitespace-nowrap font-display text-[16vw] font-black uppercase leading-[0.86] md:text-[11vw]";

  return (
    <div
      ref={ref}
      aria-label="You are not a soldier. You are not immune. Every bullet is counted. Every stranger is a risk."
      className="relative overflow-hidden bg-blood-bright py-10 text-black md:py-14"
    >
      <motion.p aria-hidden style={{ x: left }} className={row}>
        {LINE_A.repeat(3)}
      </motion.p>
      <motion.p
        aria-hidden
        style={{ x: right, WebkitTextStroke: "2px black" }}
        className={`${row} text-transparent`}
      >
        {LINE_B.repeat(3)}
      </motion.p>
    </div>
  );
}
