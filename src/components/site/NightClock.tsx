import { useEffect, useRef } from "react";

const START_HOUR = 21;
const NIGHT_MINUTES = 8 * 60; // 21:00 → 05:00

/** "23:30" → minutes after 21:00. Times before noon belong to the next morning. */
function toMinutes(value: string) {
  const [h, m] = value.split(":").map(Number);
  return ((h < 12 ? h + 24 : h) - START_HOUR) * 60 + (m || 0);
}

/**
 * The page is one night. Sections mark the time they happen at with `data-night="HH:MM"`
 * (and `data-night-end` when the time passes while the section is pinned). This clock reads
 * those marks, interpolates as you scroll, and warms/cools the page from dusk to dawn.
 */
export function NightClock() {
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let points: [number, number][] = [];
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!points.length) return;
      const probe = window.scrollY + window.innerHeight / 2;
      let minutes = points[0][1];
      for (let i = 0; i < points.length; i++) {
        const [y, m] = points[i];
        if (probe < y) break;
        const next = points[i + 1];
        minutes = next ? m + (next[1] - m) * Math.min(1, (probe - y) / (next[0] - y || 1)) : m;
      }
      minutes = Math.max(0, Math.min(NIGHT_MINUTES, minutes));
      const total = START_HOUR * 60 + Math.round(minutes);
      const hh = String(Math.floor(total / 60) % 24).padStart(2, "0");
      const mm = String(total % 60).padStart(2, "0");
      if (timeRef.current) timeRef.current.textContent = `${hh}:${mm}`;
      document.documentElement.style.setProperty("--night", (minutes / NIGHT_MINUTES).toFixed(3));
    };

    const measure = () => {
      const half = window.innerHeight / 2;
      points = [];
      document.querySelectorAll<HTMLElement>("[data-night]").forEach((el) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        const start = toMinutes(el.dataset.night ?? "21:00");
        if (el.dataset.nightEnd) {
          points.push([top + half, start]);
          points.push([top + el.offsetHeight - half, toMinutes(el.dataset.nightEnd)]);
        } else {
          points.push([top, start]);
        }
      });
      points.sort((a, b) => a[0] - b[0]);
      update();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty("--night");
    };
  }, []);

  return (
    <>
      {/* Dusk: sodium streetlight haze from above. Fades as the night goes on. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 mix-blend-screen"
        style={{
          background:
            "radial-gradient(120% 70% at 50% 0%, color-mix(in oklab, var(--color-sodium) 20%, transparent), transparent 65%)",
          opacity: "clamp(0, calc(1 - var(--night, 0) * 1.6), 1)",
        }}
      />
      {/* Dawn: cold light rising from the horizon in the last hour. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 mix-blend-screen"
        style={{
          background:
            "linear-gradient(to top, oklch(0.62 0.09 240 / 0.2), oklch(0.62 0.09 240 / 0.05) 55%, transparent 85%)",
          opacity: "clamp(0, calc((var(--night, 0) - 0.82) * 6), 1)",
        }}
      />
      <div
        aria-hidden
        className="film-grain pointer-events-none fixed inset-0 z-30 opacity-[0.07]"
      />

      <div
        aria-hidden
        className="pointer-events-none fixed right-2 top-1/2 z-40 flex -translate-y-1/2 items-baseline gap-3 font-mono uppercase text-foreground/80 mix-blend-difference [writing-mode:vertical-rl] md:right-4"
      >
        <span className="text-[0.62rem] tracking-[0.18em] text-foreground/60">Day 01</span>
        <span ref={timeRef} className="text-sm tracking-[0.12em] tabular-nums">
          21:00
        </span>
        <span className="text-[0.62rem] tracking-[0.18em] text-foreground/60">IST</span>
      </div>
    </>
  );
}
