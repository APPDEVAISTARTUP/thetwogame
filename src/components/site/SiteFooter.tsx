import { Link } from "@tanstack/react-router";
import { MessagesSquare, Video, Gamepad2, ArrowUpRight } from "lucide-react";
import { LINKS } from "@/config/support";
import { BrandWordmark } from "./BrandLogo";
import { InstagramIcon } from "./icons";

const socials = [
  { icon: InstagramIcon, label: "Instagram", href: LINKS.instagram },
  { icon: MessagesSquare, label: "Discord", href: "https://discord.gg/zdjhWFAuu" },
  { icon: Gamepad2, label: "Steam", href: LINKS.steam },
  { icon: Video, label: "YouTube", href: LINKS.youtube },
];

const nav = [
  { label: "About", href: "/#about" },
  { label: "Features", href: "/#features" },
  { label: "World", href: "/#world" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "Waitlist", href: "/#waitlist" },
];

export function SiteFooter() {
  return (
    <footer className="hairline relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blood/60 to-transparent" />

      <div className="container-x py-16 md:py-24">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <BrandWordmark className="w-44 md:w-52" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Survive. Uncover. Fight the truth. TWO is a cinematic third-person open-world zombie
              survival game set during the first days of the outbreak — built in Unreal Engine 5 by
              a solo developer in India.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="group flex h-11 w-11 items-center justify-center border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-blood hover:bg-blood/10"
                >
                  <s.icon size={16} className="transition-colors group-hover:text-blood-bright" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="eyebrow">Explore</h2>
            <ul className="mt-6 space-y-3.5">
              {nav.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/support"
                  className="inline-flex items-center gap-1.5 text-sm tracking-wide text-blood-bright transition-colors duration-300 hover:text-foreground"
                >
                  Support TWO <ArrowUpRight size={13} />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="eyebrow">Contact</h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Press, collaborations, publishing or just a note about the game — the inbox is always
              open.
            </p>

            <a
              href="mailto:progamedev@gmail.com"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors duration-300 hover:text-blood-bright"
            >
              progamedev@gmail.com
            </a>


            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <InstagramIcon size={15} className="text-blood-bright" />
              Wildcrown Games on Instagram
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-8 text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Wildcrown Games · TWO. All rights reserved.</span>
          <span>Unreal Engine 5 · PC · In Development</span>
        </div>
      </div>
    </footer>
  );
}
