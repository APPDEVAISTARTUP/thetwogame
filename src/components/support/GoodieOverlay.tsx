import { useEffect, useRef, useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const URL = "https://buymeagoddie.vercel.app/wildcrowngames";

export function useGoodieOverlay() {
  const [open, setOpen] = useState(false);
  return { open, openOverlay: () => setOpen(true), closeOverlay: () => setOpen(false) };
}

export function GoodieOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!open) return;
    setBlocked(false);
    const timer = setTimeout(() => {
      try {
        const doc = iframeRef.current?.contentDocument;
        if (doc === null) setBlocked(true);
      } catch {
        setBlocked(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 md:p-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[90svh] w-full max-w-2xl flex-col overflow-hidden border border-border bg-background"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Support TWO · Wildcrown Games
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {blocked ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 p-10 text-center">
                <AlertCircle size={28} className="text-blood-bright" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  This page can't be embedded. Open it directly instead.
                </p>
                <a
                  href={URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blood px-7 py-3 font-display text-xs uppercase tracking-[0.24em] text-primary-foreground transition-colors hover:bg-blood-bright"
                >
                  Open in new tab
                </a>
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src={URL}
                title="Support TWO on Buy Me a Goodie"
                className="flex-1 border-none bg-background"
                allow="payment"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
