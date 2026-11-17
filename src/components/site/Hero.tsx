import { Link } from "@tanstack/react-router";
import heroPoster from "@/assets/hero-poster.webp";
import { buttonClass } from "./primitives";

export function Hero() {
  return (
    <section id="top" aria-label="TWO" className="bg-black pt-16">
      <img
        src={heroPoster}
        alt="TWO key art: a lone survivor faces a rain-soaked city at night under the TWO logo"
        width={1671}
        height={941}
        fetchPriority="high"
        className="block aspect-16/9 w-full object-cover object-[50%_30%] md:max-h-[calc(100svh-4rem)]"
      />
      <div className="container-x flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between md:py-16">
        <div>
          <h1 className="max-w-2xl font-display text-4xl font-black uppercase leading-[0.92] text-white md:text-6xl">
            Survive the first night of the outbreak.
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-white/70">
            Open-world zombie survival · Set in India · Unreal Engine 5 · PC
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="#waitlist" className={buttonClass("primary")}>
            Join the waitlist
          </a>
          <Link to="/support" className={buttonClass("outline")}>
            Support development
          </Link>
        </div>
      </div>
    </section>
  );
}
