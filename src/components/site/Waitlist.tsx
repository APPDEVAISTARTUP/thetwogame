import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import ctaCity from "@/assets/cta-city.jpg";
import { CinematicButton, Reveal } from "./primitives";

export function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="relative grain overflow-hidden py-32 md:py-48">
      <img
        src={ctaCity}
        alt="Helicopter searchlights over a burning city skyline"
        loading="lazy"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-background/85" />
      <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />

      <div className="container-x relative">
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <span className="eyebrow">Waitlist</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-lg mt-6">Be there on night one</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Closed demo access, development letters and nothing else. No noise.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel mt-12 p-10"
              >
                <p className="font-display text-2xl uppercase tracking-[0.1em] text-foreground">
                  You are on the list
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Welcome, {name.trim()}. Watch your inbox when the closed demo opens.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="mt-12 flex flex-col gap-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                  aria-label="Name"
                  className="w-full border border-border bg-background/60 px-6 py-4 text-sm tracking-wide text-foreground outline-hidden transition-colors duration-300 placeholder:text-muted-foreground focus:border-blood"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  required
                  aria-label="Email"
                  className="w-full border border-border bg-background/60 px-6 py-4 text-sm tracking-wide text-foreground outline-hidden transition-colors duration-300 placeholder:text-muted-foreground focus:border-blood"
                />
                <CinematicButton type="submit" className="w-full">
                  Join Waitlist
                </CinematicButton>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}