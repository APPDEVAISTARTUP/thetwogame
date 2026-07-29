import { Camera, MessagesSquare, Video, Gamepad2, Mail } from "lucide-react";

const socials = [
  { icon: Camera, label: "Instagram", href: "https://instagram.com" },
  { icon: MessagesSquare, label: "Discord", href: "https://discord.com" },
  { icon: Gamepad2, label: "Steam", href: "https://store.steampowered.com" },
  { icon: Video, label: "YouTube", href: "https://youtube.com" },
  { icon: Mail, label: "Contact", href: "mailto:hello@twogame.in" },
];

export function SiteFooter() {
  return (
    <footer className="hairline">
      <div className="container-x py-20">
        <div className="flex flex-col justify-between gap-14 lg:flex-row">
          <div>
            <div className="font-display text-5xl tracking-[0.32em] text-foreground">TWO</div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Survive. Uncover. Fight the truth. A story-driven survival horror game made in India.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                <s.icon size={15} className="transition-colors group-hover:text-blood-bright" />
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} TWO. All rights reserved.</span>
          <span>Unreal Engine 5 · PC · In Development</span>
        </div>
      </div>
    </footer>
  );
}