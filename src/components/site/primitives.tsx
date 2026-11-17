import { motion, type Variants } from "framer-motion";
import { Fragment, type ReactNode } from "react";
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

/** Headline that rises word by word out of a mask when it scrolls into view. */
export function RevealText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.07 }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%", rotate: 4 },
                show: { y: 0, rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {word}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </motion.span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Kept for compatibility; no longer rendered. */
  index?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <h2 className="display-lg text-balance-tight mt-5 text-foreground">
        <RevealText text={title} />
      </h2>
      {description && (
        <Reveal delay={0.12}>
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
  night,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** In-fiction time (HH:MM) this section happens at; drives the night clock. */
  night?: string;
}) {
  return (
    <section id={id} data-night={night} className={cn("scroll-mt-20 py-24 md:py-36", className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const buttonClass = (variant: "primary" | "ghost" | "outline" = "primary") =>
  cn(
    "inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50",
    variant === "primary" &&
      "bg-blood-bright text-white shadow-[0_0_40px_-8px_var(--color-blood-bright)] hover:bg-white hover:text-black hover:shadow-[0_0_60px_-6px_white]",
    variant === "outline" &&
      "border border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground/5",
    variant === "ghost" && "text-muted-foreground hover:text-foreground",
  );

export function CinematicButton({
  children,
  variant = "primary",
  className,
  ...rest
}: ButtonProps) {
  return (
    <button {...rest} className={cn(buttonClass(variant), className)}>
      {children}
    </button>
  );
}
