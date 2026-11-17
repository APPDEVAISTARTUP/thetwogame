import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Ember = { x: number; y: number; r: number; vx: number; vy: number; life: number; hue: number };

/**
 * Burning ash drifting up from the street. Drawn on a canvas at device resolution, so it
 * stays sharp on 4K/8K screens. Pauses when off-screen and is disabled for reduced motion.
 */
export function Embers({ className, density = 1 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let h = 0;
    let frame = 0;
    let visible = true;
    let last = performance.now();
    let embers: Ember[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 3);

    const spawn = (anywhere: boolean): Ember => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: 0.6 + Math.random() * 2.2,
      vx: -12 + Math.random() * 40,
      vy: -(18 + Math.random() * 60),
      life: Math.random(),
      hue: 8 + Math.random() * 30,
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(160, (w * h) / 14000) * density);
      embers = Array.from({ length: count }, () => spawn(true));
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life += dt * 0.6;
        e.x += (e.vx + Math.sin(e.life * 5 + i) * 14) * dt;
        e.y += e.vy * dt;
        if (e.y < -20 || e.x < -20 || e.x > w + 20) embers[i] = spawn(false);
        const flicker = 0.45 + 0.55 * Math.abs(Math.sin(e.life * 7 + i));
        const fade = Math.min(1, e.y / (h * 0.35));
        const alpha = flicker * fade;
        const glow = e.r * 5;
        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, glow);
        g.addColorStop(0, `hsla(${e.hue}, 100%, 68%, ${alpha})`);
        g.addColorStop(0.25, `hsla(${e.hue}, 100%, 52%, ${alpha * 0.5})`);
        g.addColorStop(1, `hsla(${e.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(e.x, e.y, glow, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = performance.now();
    });
    viewObserver.observe(canvas);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      viewObserver.disconnect();
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
