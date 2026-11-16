import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Features } from "@/components/site/Features";
import { World } from "@/components/site/World";
import { Facility } from "@/components/site/Facility";
import { NightClock } from "@/components/site/NightClock";
import { Gallery } from "@/components/site/Gallery";
import { Roadmap } from "@/components/site/Roadmap";
import { Supporters } from "@/components/site/Supporters";
import { Waitlist } from "@/components/site/Waitlist";
import { Support } from "@/components/site/Support";
import { Faq, faqs } from "@/components/site/Faq";
import { SiteFooter } from "@/components/site/SiteFooter";

const description =
  "TWO is a cinematic open-world zombie survival game set during the outbreak, built in Unreal Engine 5 by a solo developer in India. Join the waitlist.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TWO — Open World Zombie Survival Game" },
      { name: "description", content: description },
      { property: "og:title", content: "TWO — Open World Zombie Survival Game" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "TWO — Open World Zombie Survival Game" },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: "TWO",
          description,
          genre: ["Survival Horror", "Open World", "Action"],
          gamePlatform: "PC",
          applicationCategory: "Game",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <NightClock />
      <main>
        <Hero />
        <About />
        <World />
        <Facility />
        <Features />
        <Gallery />
        <Roadmap />
        <Waitlist />
        <Supporters />
        <Support />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  );
}
