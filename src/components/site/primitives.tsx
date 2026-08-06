import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  index,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  index?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Reveal>
        <div className={cn("flex items-center gap-4", align === "center" && "justify-center")}>
          {align === "left" && <span className="h-px w-10 bg-blood" />}
          <span className="eyebrow">{eyebrow}</span>
          {index && <span className="index-label opacity-60">/ {index}</span>}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display-lg text-balance-tight mt-6 text-foreground [text-shadow:0_2px_40px_rgba(0,0,0,0.6)]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-28 md:py-40", className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline" | "pill";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function CinematicButton({
  children,
  variant = "primary",
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-8 py-4 font-display text-sm uppercase tracking-[0.28em] transition-all duration-500 disabled:opacity-50",
        variant === "primary" &&
          "bg-blood text-primary-foreground hover:bg-blood-bright hover:shadow-[0_0_44px_-8px_var(--color-blood-bright)]",
        variant === "pill" &&
          "rounded-full bg-blood px-9 py-3 text-[0.7rem] tracking-[0.22em] text-primary-foreground hover:bg-blood-bright hover:shadow-[0_0_44px_-8px_var(--color-blood-bright)]",
        variant === "outline" &&
          "border border-border text-foreground hover:border-blood hover:text-foreground",
        variant === "ghost" && "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      {variant !== "ghost" && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-foreground/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
    </button>
  );
}
