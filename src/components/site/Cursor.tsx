import { useEffect, useRef } from "react";

/** A glowing ember that follows the mouse and swells over anything clickable. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;
    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let scale = 1;
    let target = 1;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      d.style.opacity = r.style.opacity = "1";
      const el = e.target as Element | null;
      target = el?.closest("a, button, input, textarea, [role=button]") ? 2.4 : 1;
    };
    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (target - scale) * 0.18;
      d.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      r.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] h-9 w-9 rounded-full border border-blood-bright opacity-0 shadow-[0_0_24px_var(--color-blood-bright)]"
      />
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-white opacity-0"
      />
    </>
  );
}
