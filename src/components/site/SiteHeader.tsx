import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "World", href: "#world" },
  { label: "Gallery", href: "#gallery" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Support", href: "#support" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-panel border-x-0 border-t-0 py-3" : "border-transparent py-6",
      )}
    >
      <div className="container-x flex items-center justify-between">
        <a href="#top" className="font-display text-2xl tracking-[0.3em] text-foreground">
          TWO
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-300 hover:text-foreground after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-blood after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#waitlist"
            className="hidden border border-border px-6 py-3 font-display text-xs uppercase tracking-[0.28em] transition-colors duration-300 hover:border-blood sm:inline-block"
          >
            Join Waitlist
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-foreground lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-background/95 lg:hidden"
          >
            <div className="container-x flex flex-col gap-5 py-8">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-lg uppercase tracking-[0.2em] text-muted-foreground"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}