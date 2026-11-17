import { Reveal } from "@/components/site/primitives";
import { GoodieOverlay, useGoodieOverlay } from "./GoodieOverlay";

export function DonationPanel() {
  const { open, openOverlay, closeOverlay } = useGoodieOverlay();

  return (
    <Reveal>
      <div className="flex flex-col items-center gap-8 py-10 text-center">
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
          Support TWO through Buy Me a Goodie — a simple, secure way to contribute any amount.
          Every rupee goes straight into building the game.
        </p>
        <button
          onClick={openOverlay}
          className="inline-flex items-center gap-3 bg-blood px-10 py-5 font-display text-sm uppercase tracking-[0.28em] text-primary-foreground transition-all duration-500 hover:bg-blood-bright hover:shadow-[0_0_44px_-8px_var(--color-blood-bright)]"
        >
          Support TWO
        </button>
        <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
          Any amount · UPI, cards &amp; more
        </p>
      </div>
      <GoodieOverlay open={open} onClose={closeOverlay} />
    </Reveal>
  );
}
