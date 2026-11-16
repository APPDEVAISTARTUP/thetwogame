import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Boxes, Move3d, Trees, AudioLines, Bug, Wallet } from "lucide-react";
import supportHero from "@/assets/support-hero.jpg";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BrandWordmark } from "@/components/site/BrandLogo";
import { Reveal, Section, SectionHeading } from "@/components/site/primitives";
import { DonationPanel } from "@/components/support/DonationPanel";
import { FUNDING_GOAL, formatInr } from "@/config/support";
import { getSupportStats } from "@/lib/donations.functions";

const description =
  "Support TWO — help a solo indie developer bring a cinematic open-world zombie survival game to life. Donate securely via Razorpay (UPI, cards, netbanking), unlock supporter rewards and follow the funding progress.";

export const Route = createFileRoute("/support")({
  component: SupportPage,
  head: () => ({
    meta: [
      { title: "Support TWO — Back an Indie Horror Game" },
      { name: "description", content: description },
      { property: "og:title", content: "Support TWO — Back an Indie Horror Game" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Support TWO — Back an Indie Horror Game" },
      { name: "twitter:description", content: description },
    ],
  }),
});

const helps = [
  {
    icon: Boxes,
    title: "Better Game Assets",
    text: "Higher fidelity props, weapons and characters that hold up in close-up shots.",
  },
  {
    icon: Move3d,
    title: "Motion Capture & Animation",
    text: "Believable movement, melee weight and cinematic story beats.",
  },
  {
    icon: Trees,
    title: "Environment Art",
    text: "Denser streets, richer interiors and a world worth exploring slowly.",
  },
  {
    icon: AudioLines,
    title: "Sound Design",
    text: "Foley, ambience and a score that makes silence terrifying.",
  },
  {
    icon: Bug,
    title: "Testing",
    text: "Playtesters and devices to catch what one pair of eyes always misses.",
  },
  {
    icon: Wallet,
    title: "Development Costs",
    text: "Engine plugins, licences, hardware and the time to keep building.",
  },
];

const rewards = [
  {
    amount: "₹100",
    title: "Digital Thank You",
    perks: ["A personal thank-you note from the developer"],
  },
  {
    amount: "₹500",
    title: "Supporter Role",
    perks: ["Supporter role in the community", "Name listed on the Supporters page (optional)"],
  },
  {
    amount: "₹1000",
    title: "Special Supporter",
    perks: [
      "Special supporter badge",
      "Name in the game credits (optional)",
      "Priority early demo access when available",
    ],
    featured: true,
  },
];

const faqs = [
  {
    q: "Where will my donation go?",
    a: "Straight into building TWO — assets, animation, environment art, sound, testing hardware and the software licences needed to keep development moving. Nothing is spent outside the game.",
  },
  {
    q: "Will I receive rewards?",
    a: "Yes. Rewards are a token of appreciation rather than a purchase. Send a message on Instagram or email after donating with your name and the amount, and your reward will be arranged.",
  },
  {
    q: "Is my donation refundable?",
    a: "Donations are voluntary contributions to independent development and are non-refundable. If something goes wrong with a payment, get in touch and it will be sorted out personally.",
  },
  {
    q: "How can I stay updated?",
    a: "Join the waitlist on the home page and follow Shade Studios on Instagram. Development letters, screenshots and demo access all go out there first.",
  },
];

function SupportPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["support-stats"],
    queryFn: () => getSupportStats(),
  });
  const supporters = stats?.recent;
  const raised = stats?.raisedInr ?? 0;
  const progress = Math.min(100, (raised / FUNDING_GOAL) * 100);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative grain flex min-h-[78svh] items-center overflow-hidden pt-32 pb-20 md:min-h-[86svh]">
          <img
            src={supportHero}
            alt="A lone survivor overlooking a burning city at dusk"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-background/90 via-background/55 to-background" />
          <div className="container-x relative">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <BrandWordmark className="w-36 md:w-44" />
              <span className="eyebrow mt-8 block">Crowdfunding</span>
              <h1 className="display-xl mt-5 text-foreground">
                Support <span className="text-blood-bright">TWO</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Help a solo indie developer bring TWO to life.
              </p>
              <a
                href="#donate"
                className="mt-10 inline-flex items-center gap-3 bg-blood px-8 py-4 font-display text-sm uppercase tracking-[0.28em] text-primary-foreground transition-all duration-500 hover:bg-blood-bright hover:shadow-[0_0_44px_-8px_var(--color-blood-bright)]"
              >
                Choose your support
              </a>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <Section className="hairline">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading eyebrow="The Story" title="One developer. One world." />
            <div className="space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              <Reveal>
                <p>
                  TWO is being built independently — no publisher, no studio floor, no safety net.
                  Every street, every animation and every sound in the outbreak is made after work
                  hours by one person who refuses to let this world stay unfinished.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>
                  Every contribution goes directly into development. It buys the asset packs, the
                  animation time, the sound libraries and the testing hardware that turn an
                  ambitious solo project into something that genuinely feels AAA.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="text-foreground">
                  If you support TWO, you are not buying a product. You become part of this journey
                  — one of the people who made the first night possible.
                </p>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* Donate */}
        <Section id="donate" className="hairline">
          <SectionHeading
            eyebrow="Donate"
            title="Choose Your Support"
            description="Pick an amount, add your name and pay securely with UPI, cards, netbanking or wallets through Razorpay."
          />
          {raised > 0 && (
            <div className="mt-12 max-w-2xl">
              <div className="flex items-end justify-between font-display text-xs uppercase tracking-[0.24em] text-muted-foreground">
                <span>
                  <span className="text-2xl text-foreground">{formatInr(raised)}</span> raised
                </span>
                <span>Goal {formatInr(FUNDING_GOAL)}</span>
              </div>
              <div className="mt-3 h-1 w-full bg-border">
                <div
                  className="h-1 bg-blood-bright shadow-[0_0_12px_var(--color-blood-bright)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          <div className="mt-16">
            <DonationPanel />
          </div>
        </Section>

        {/* How donations help */}
        <Section className="hairline">
          <SectionHeading
            eyebrow="Impact"
            title="How donations help"
            description="Nothing here is abstract — this is exactly what your contribution turns into."
          />
          <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {helps.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.05}>
                <div className="group h-full bg-background p-8 transition-colors duration-500 hover:bg-card md:p-10">
                  <h.icon
                    size={22}
                    className="text-muted-foreground transition-colors duration-500 group-hover:text-blood-bright"
                  />
                  <h3 className="mt-6 font-display text-lg uppercase tracking-[0.12em] text-foreground">
                    {h.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Rewards */}
        <Section className="hairline">
          <SectionHeading
            eyebrow="Rewards"
            title="A thank you, not a transaction"
            description="Supporter rewards are a way of saying thank you for believing in TWO early."
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {rewards.map((r, i) => (
              <Reveal key={r.amount} delay={i * 0.07}>
                <div
                  className={`flex h-full flex-col border p-8 transition-all duration-500 md:p-10 ${
                    r.featured
                      ? "border-blood bg-card shadow-[0_0_60px_-30px_var(--color-blood-bright)]"
                      : "border-border bg-background hover:-translate-y-1 hover:border-foreground/25"
                  }`}
                >
                  <div className="font-display text-4xl text-foreground">{r.amount}</div>
                  <h3 className="mt-5 font-display text-lg uppercase tracking-[0.14em] text-foreground">
                    {r.title}
                  </h3>
                  <ul className="mt-7 space-y-3 border-t border-border pt-7">
                    {r.perks.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2.5 h-px w-4 shrink-0 bg-blood" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Recent supporters */}
        <Section className="hairline">
          <SectionHeading
            align="center"
            eyebrow="Recent Supporters"
            title="The people behind TWO"
          />
          <div className="mx-auto mt-16 max-w-5xl">
            {isLoading ? (
              <p className="text-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Loading…
              </p>
            ) : supporters && supporters.length > 0 ? (
              <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {supporters.map((s) => (
                  <div key={s.id} className="bg-card p-8">
                    <div className="font-display text-lg uppercase tracking-[0.1em] text-foreground">
                      {s.name}
                    </div>
                    {s.amountInr ? (
                      <div className="mt-2 text-[0.65rem] uppercase tracking-[0.24em] text-blood-bright">
                        {formatInr(s.amountInr)}
                      </div>
                    ) : null}
                    {s.message ? (
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        “{s.message}”
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-border bg-card p-12 text-center md:p-16">
                <p className="font-display text-2xl uppercase tracking-[0.1em] text-foreground md:text-3xl">
                  Be the first supporter of TWO.
                </p>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  This wall fills up with the names of everyone who backed the outbreak before it
                  began.
                </p>
              </div>
            )}
          </div>
        </Section>

        {/* FAQ */}
        <Section className="hairline">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <SectionHeading eyebrow="FAQ" title="Before you give" />
            <div className="border-t border-border">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.05}>
                  <div className="border-b border-border">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
                    >
                      <span className="font-display text-base uppercase tracking-[0.08em] text-foreground md:text-2xl">
                        {f.q}
                      </span>
                      <Plus
                        size={18}
                        className={`shrink-0 text-muted-foreground transition-transform duration-500 ${
                          openFaq === i ? "rotate-45 text-blood-bright" : ""
                        }`}
                      />
                    </button>
                    {openFaq === i && (
                      <p className="max-w-2xl pb-8 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {f.a}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
