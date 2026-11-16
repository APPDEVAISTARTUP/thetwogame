import { useMemo, useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { CinematicButton, Reveal } from "@/components/site/primitives";
import { MAX_DONATION_INR, MIN_DONATION_INR, formatInr } from "@/config/support";
import { createDonationOrder, donationSchema, verifyDonation } from "@/lib/donations.functions";
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

type RazorpaySuccess = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayInstance = {
  open: () => void;
  on: (event: string, cb: (res: unknown) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

let checkoutScript: Promise<boolean> | null = null;

function loadCheckout() {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  checkoutScript ??= new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(Boolean(window.Razorpay));
    script.onerror = () => {
      checkoutScript = null;
      resolve(false);
    };
    document.body.appendChild(script);
  });
  return checkoutScript;
}

type Phase = "idle" | "creating" | "paying" | "verifying" | "done";

const field =
  "w-full border border-border bg-background px-5 py-4 text-sm outline-hidden transition-colors placeholder:text-muted-foreground focus:border-blood";

export function DonationPanel() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<number | "custom">(500);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [paidAmount, setPaidAmount] = useState(0);

  const amount = useMemo(() => {
    if (selected === "custom") {
      const parsed = Number(custom.replace(/[^0-9]/g, ""));
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    }
    return selected;
  }, [selected, custom]);

  const busy = phase === "creating" || phase === "paying" || phase === "verifying";

  const fail = (msg: string) => {
    setError(msg);
    toast.error(msg);
    setPhase("idle");
  };

  const donate = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = donationSchema.safeParse({
      amountInr: amount,
      name,
      email,
      message: message || undefined,
      isPublic,
    });
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Check the form.");

    setPhase("creating");
    const [ready, order] = await Promise.all([
      loadCheckout(),
      createDonationOrder({ data: parsed.data }).catch(() => ({ status: "failed" as const })),
    ]);

    if (order.status !== "created") {
      return fail(
        order.status === "unconfigured"
          ? "Online donations are being set up. Please try again shortly."
          : order.status === "rate-limited"
            ? "Too many attempts. Please wait a few minutes and try again."
            : "Could not start the payment. Please try again.",
      );
    }
    if (!ready || !window.Razorpay) {
      return fail(
        "Could not load Razorpay. Check your connection or disable ad-blockers and retry.",
      );
    }

    setPhase("paying");
    const checkout = new window.Razorpay({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amountPaise,
      currency: order.currency,
      name: "TWO — Shade Studios",
      description: "Support TWO",
      prefill: { name: parsed.data.name, email: parsed.data.email || undefined },
      notes: { purpose: "Support TWO" },
      theme: { color: "#b3121b" },
      handler: async (res: RazorpaySuccess) => {
        setPhase("verifying");
        const result = await verifyDonation({
          data: {
            orderId: res.razorpay_order_id,
            paymentId: res.razorpay_payment_id,
            signature: res.razorpay_signature,
          },
        }).catch(() => ({ status: "failed" as const }));

        if (result.status === "paid") {
          setPaidAmount(parsed.data.amountInr);
          setPhase("done");
          toast.success("Thank you for supporting TWO!");
          void queryClient.invalidateQueries({ queryKey: ["support-stats"] });
        } else {
          fail(
            `Payment received but we couldn't confirm it automatically. Keep your payment ID: ${res.razorpay_payment_id}`,
          );
        }
      },
      modal: {
        ondismiss: () => setPhase((p) => (p === "paying" ? "idle" : p)),
      },
    });
    checkout.on("payment.failed", () => {
      toast.error("Payment failed. You can try again.");
    });
    checkout.open();
  };

  if (phase === "done") {
    return (
      <Reveal>
        <div className="glass-panel mx-auto max-w-2xl p-10 text-center md:p-14">
          <CheckCircle2 className="mx-auto text-blood-bright" size={40} />
          <h3 className="mt-6 font-display text-3xl uppercase tracking-[0.08em] text-foreground md:text-4xl">
            Thank you, {name.trim() || "survivor"}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Your {formatInr(paidAmount)} contribution has been received and goes straight into
            building TWO.
            {isPublic ? " Your name will appear on the supporters wall." : ""}
          </p>
          <button
            type="button"
            onClick={() => {
              setPhase("idle");
              setMessage("");
            }}
            className="mt-8 text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Make another donation
          </button>
        </div>
      </Reveal>
    );
  }

  return (
    <form
      onSubmit={donate}
      noValidate
      className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14"
    >
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
              Give what feels right ({formatInr(MIN_DONATION_INR)} – {formatInr(MAX_DONATION_INR)}).
              Every rupee is development time.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <span className="font-display text-2xl text-muted-foreground">₹</span>
              <input
                id="custom-amount"
                value={custom}
                onFocus={() => setSelected("custom")}
                onChange={(e) => {
                  setSelected("custom");
                  setCustom(e.target.value.replace(/[^0-9]/g, "").slice(0, 6));
                }}
                inputMode="numeric"
                placeholder="Enter amount"
                className={field}
              />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Donor details + pay */}
      <Reveal delay={0.1}>
        <div className="glass-panel flex h-full flex-col gap-4 p-8 md:p-10">
          <span className="eyebrow flex items-center gap-2">
            <ShieldCheck size={13} /> Secure payment via Razorpay
          </span>
          <div className="font-display text-4xl text-foreground">
            {amount ? formatInr(amount) : "Choose an amount"}
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            aria-label="Your name"
            autoComplete="name"
            maxLength={80}
            required
            className={field}
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email (optional, for your receipt)"
            aria-label="Email (optional)"
            autoComplete="email"
            inputMode="email"
            maxLength={255}
            className={field}
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="A message for the developer (optional)"
            aria-label="Message (optional)"
            maxLength={280}
            rows={3}
            className={cn(field, "resize-none")}
          />
          <label className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-blood)]"
            />
            Show my name on the supporters wall
          </label>
          {error && (
            <p role="alert" className="text-xs leading-relaxed text-destructive">
              {error}
            </p>
          )}
          <CinematicButton type="submit" className="mt-2 w-full" disabled={busy || !amount}>
            {busy ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                {phase === "verifying" ? "Confirming…" : "Opening Razorpay…"}
              </>
            ) : (
              <>Donate {amount ? formatInr(amount) : "Now"}</>
            )}
          </CinematicButton>
          <p className="text-[0.65rem] leading-relaxed tracking-wide text-muted-foreground">
            Pay with UPI, cards, netbanking or wallets. Payments are processed by Razorpay; card and
            bank details never reach this website.
          </p>
        </div>
      </Reveal>
    </form>
  );
}
