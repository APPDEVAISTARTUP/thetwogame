import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { toast } from "sonner";
import { Check, Copy, QrCode, Smartphone } from "lucide-react";
import { CinematicButton, Reveal } from "@/components/site/primitives";
import { UPI_ID, buildUpiLink, formatInr } from "@/config/support";
import { cn } from "@/lib/utils";

const tiers = [
  { amount: 100, title: "Supporter", text: "A small contribution that keeps the lights on." },
  { amount: 500, title: "Backer", text: "Helps accelerate development week by week." },
  {
    amount: 1000,
    title: "Champion",
    text: "Become one of the biggest supporters of TWO.",
    featured: true,
  },
];

export function DonationPanel() {
  const [selected, setSelected] = useState<number | "custom">(500);
  const [custom, setCustom] = useState("");
  const [qr, setQr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const amount = useMemo(() => {
    if (selected === "custom") {
      const parsed = Number(custom.replace(/[^0-9]/g, ""));
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    }
    return selected;
  }, [selected, custom]);

  const upiLink = useMemo(() => buildUpiLink(amount || undefined), [amount]);

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(upiLink, {
      width: 640,
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#f5f5f5", light: "#00000000" },
    })
      .then((url) => active && setQr(url))
      .catch(() => active && setQr(null));
    return () => {
      active = false;
    };
  }, [upiLink]);

  const donate = () => {
    if (!amount) {
      toast.error("Enter an amount to continue.");
      return;
    }
    window.location.href = upiLink;
    window.setTimeout(() => {
      toast("No UPI app opened?", {
        description: "Scan the QR code below from your phone instead.",
      });
    }, 2200);
  };

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      toast.success("UPI ID copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy. UPI ID: " + UPI_ID);
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
      {/* Amount selection */}
      <div>
        <div className="grid gap-4 sm:grid-cols-3">
          {tiers.map((t, i) => {
            const active = selected === t.amount;
            return (
              <Reveal key={t.amount} delay={i * 0.06}>
                <button
                  type="button"
                  onClick={() => setSelected(t.amount)}
                  aria-pressed={active}
                  className={cn(
                    "group relative flex h-full w-full flex-col border p-6 text-left transition-all duration-500 md:p-7",
                    active
                      ? "border-blood bg-card shadow-[0_0_60px_-30px_var(--color-blood-bright)]"
                      : "border-border bg-background hover:-translate-y-1 hover:border-foreground/30",
                  )}
                >
                  {t.featured && (
                    <span className="absolute right-0 top-0 bg-blood px-3 py-1.5 text-[0.55rem] uppercase tracking-[0.24em] text-primary-foreground">
                      Most chosen
                    </span>
                  )}
                  <span className="font-display text-3xl text-foreground md:text-4xl">
                    {formatInr(t.amount)}
                  </span>
                  <span className="mt-4 font-display text-sm uppercase tracking-[0.18em] text-foreground">
                    {t.title}
                  </span>
                  <span className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {t.text}
                  </span>
                  <span
                    className={cn(
                      "mt-5 h-px w-full transition-colors duration-500",
                      active ? "bg-blood" : "bg-border",
                    )}
                  />
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.12}>
          <div
            className={cn(
              "mt-4 border p-6 transition-colors duration-500 md:p-7",
              selected === "custom" ? "border-blood bg-card" : "border-border bg-background",
            )}
          >
            <label
              htmlFor="custom-amount"
              className="font-display text-sm uppercase tracking-[0.18em] text-foreground"
            >
              Custom Amount
            </label>
            <p className="mt-2 text-xs text-muted-foreground">
              Give what feels right. Every rupee is development time.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <span className="font-display text-2xl text-muted-foreground">₹</span>
              <input
                id="custom-amount"
                value={custom}
                onFocus={() => setSelected("custom")}
                onChange={(e) => {
                  setSelected("custom");
                  setCustom(e.target.value.replace(/[^0-9]/g, "").slice(0, 7));
                }}
                inputMode="numeric"
                placeholder="Enter amount"
                className="w-full border border-border bg-background px-5 py-4 text-sm outline-hidden transition-colors focus:border-blood"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CinematicButton onClick={donate} className="w-full sm:w-auto">
              <Smartphone size={14} />
              Donate {amount ? formatInr(amount) : "Now"}
            </CinematicButton>
            <button
              type="button"
              onClick={copyUpi}
              className="inline-flex items-center justify-center gap-2 border border-border px-6 py-4 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:border-blood hover:text-foreground"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {UPI_ID}
            </button>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            On mobile this opens Google Pay, PhonePe, Paytm or BHIM with the amount already filled
            in — you only confirm. On desktop, scan the QR code with your phone.
          </p>
        </Reveal>
      </div>

      {/* QR */}
      <Reveal delay={0.1}>
        <div className="glass-panel flex h-full flex-col items-center justify-center p-8 text-center md:p-10">
          <span className="eyebrow flex items-center gap-2">
            <QrCode size={13} /> Scan to pay
          </span>
          <div className="mt-8 flex aspect-square w-full max-w-[300px] items-center justify-center border border-border bg-background p-5">
            {qr ? (
              <img
                src={qr}
                alt={`UPI QR code to donate ${amount ? formatInr(amount) : "to TWO"}`}
                width={640}
                height={640}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Generating…
              </span>
            )}
          </div>
          <div className="mt-8 font-display text-3xl text-foreground">
            {amount ? formatInr(amount) : "Any amount"}
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">{UPI_ID}</p>
        </div>
      </Reveal>
    </div>
  );
}
