import { useEffect, useRef } from "react";
import lab from "@/assets/world-lab.jpg";

const beam =
  "radial-gradient(circle 26vmax at var(--fx, 62%) var(--fy, 45%), black 0%, rgba(0,0,0,0.75) 30%, transparent 68%)";

/**
 * Facility Two is dark. The pointer is the only light: it reveals the room and the one
 * line of text that is not visible without it. With no pointer, the beam sweeps on its own.
 */
export function Facility() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let visible = false;
    let held = false;
    let release = 0;
    const started = performance.now();

    const set = (x: number, y: number) => {
      el.style.setProperty("--fx", `${x}px`);
      el.style.setProperty("--fy", `${y}px`);
    };

    const sweep = (now: number) => {
      if (visible && !held) {
        const t = (now - started) / 1000;
        set(
          el.clientWidth * (0.56 + 0.3 * Math.sin(t * 0.42)),
          el.clientHeight * (0.5 + 0.24 * Math.sin(t * 0.77 + 1.2)),
        );
      }
      frame = requestAnimationFrame(sweep);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      held = true;
      window.clearTimeout(release);
      set(e.clientX - rect.left, e.clientY - rect.top);
      if (e.pointerType !== "mouse") release = window.setTimeout(() => (held = false), 1800);
    };
    const onLeave = () => {
      held = false;
    };

    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    observer.observe(el);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    if (!reduce) frame = requestAnimationFrame(sweep);

    return () => {
      observer.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.clearTimeout(release);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="facility"
      ref={ref}
      data-night="04:30"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-black"
    >
      <img
        src={lab}
        alt="A sealed research facility corridor, almost completely dark"
        loading="lazy"
        width={1600}
        height={1008}
        className="absolute inset-0 h-full w-full object-cover brightness-[0.14]"
      />
      {/* Everything in this layer exists only inside the beam. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ maskImage: beam, WebkitMaskImage: beam }}
      >
        <img
          src={lab}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover brightness-110"
        />
        <p className="absolute right-[6vw] top-[22svh] max-w-[11ch] text-right font-display text-5xl font-black uppercase leading-[0.88] text-foreground/85 md:text-8xl">
          It has answers you may not survive reading.
        </p>
      </div>
      <div aria-hidden className="film-grain absolute inset-0 opacity-20" />

      <div className="container-x pointer-events-none relative pb-[16svh] pt-40">
        <span className="eyebrow">04:30 · Restricted</span>
        <h2 className="display-xl mt-5 text-foreground">Facility Two</h2>
        <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/75 md:text-lg">
          It is not on any map. It carries a national emblem on the door.
        </p>
        <p className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-sodium">
          Move your light to look around
        </p>
      </div>
    </section>
  );
}
