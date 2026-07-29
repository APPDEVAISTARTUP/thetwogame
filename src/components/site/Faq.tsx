import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

export const faqs = [
  {
    q: "What is TWO?",
    a: "TWO is a cinematic open-world zombie survival game set during the first days of an outbreak, not years after the collapse. It focuses on atmosphere, exploration, resource scarcity and emotional storytelling.",
  },
  {
    q: "When will it release?",
    a: "There is no announced date. The vertical slice is in development and a closed demo will reach waitlist members first. A release window will be shared only when it is real.",
  },
  {
    q: "Which platform?",
    a: "PC at launch. Additional platforms will be considered after release.",
  },
  {
    q: "Who is developing it?",
    a: "TWO is being developed by a solo developer from India in Unreal Engine 5, with select external help for audio and animation.",
  },
  {
    q: "How can I support?",
    a: "Join the waitlist, share the project, or become a Founding Survivor through the support tiers. Founding Survivors are credited in-game.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="hairline">
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <SectionHeading eyebrow="FAQ" title="Questions" />
        <div className="border-t border-border">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className="border-b border-border">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="font-display text-lg uppercase tracking-[0.08em] text-foreground md:text-2xl">
                    {f.q}
                  </span>
                  <Plus
                    size={18}
                    className={`shrink-0 text-muted-foreground transition-transform duration-500 ${
                      open === i ? "rotate-45 text-blood-bright" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}