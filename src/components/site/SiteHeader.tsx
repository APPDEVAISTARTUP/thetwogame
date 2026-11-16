import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandWordmark } from "./BrandLogo";
import { buttonClass } from "./primitives";

const links = [
  { label: "Story", href: "/#about" },
  { label: "World", href: "/#world" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Roadmap", href: "/#roadmap" },
];

const linkClass =
  "text-[0.8rem] font-medium uppercase tracking-[0.14em] text-foreground/70 transition-colors duration-300 hover:text-foreground";

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
        "fixed inset-x-0 top-0 z-50 transition-[background-color,padding,border-color] duration-500",
        scrolled || open
          ? "border-b border-border bg-background/90 py-3 backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-5",
      )}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <Link
          to="/"
          aria-label="TWO — home"
          className="block shrink-0 transition-opacity duration-300 hover:opacity-80"
        >
          <BrandWordmark className="w-20 md:w-24" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </a>
          ))}
          <Link to="/support" className={linkClass}>
            Support
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/#waitlist"
            className={cn(buttonClass("primary"), "hidden px-5 py-3 sm:inline-flex")}
          >
            Join the waitlist
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-foreground lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 pb-6 pt-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 font-display text-3xl font-bold uppercase text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/support"
                onClick={() => setOpen(false)}
                className="py-3 font-display text-3xl font-bold uppercase text-blood-bright"
              >
                Support TWO
              </Link>
              <a
                href="/#waitlist"
                onClick={() => setOpen(false)}
                className={cn(buttonClass("primary"), "mt-4")}
              >
                Join the waitlist
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
