import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/site/primitives";
import { SUPPORT_URL } from "@/config/support";

export function DonationPanel() {
  return (
    <Reveal>
      <div className="flex flex-col items-center gap-8 py-10 text-center">
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
          Support TWO through Buy Me a Goodie — a simple, secure way to contribute any amount.
          Every rupee goes straight into building the game.
        </p>
        <a
          href={SUPPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-blood-bright px-10 py-5 font-display text-sm font-extrabold uppercase tracking-[0.28em] text-white transition-all duration-500 hover:bg-blood hover:shadow-[0_0_44px_-8px_var(--color-blood-bright)]"
        >
          Support TWO <ExternalLink size={15} />
        </a>
        <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
          Opens in a new tab · Any amount · UPI, cards &amp; more
        </p>
      </div>
    </Reveal>
  );
}
