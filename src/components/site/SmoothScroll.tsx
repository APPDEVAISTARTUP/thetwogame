import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/** Inertial wheel scrolling so the scroll-driven scenes feel like a camera move. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.1 });
    return () => lenis.destroy();
  }, []);
  return null;
}
