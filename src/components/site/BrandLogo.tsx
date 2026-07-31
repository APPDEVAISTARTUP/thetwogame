import wordmark from "@/assets/two-wordmark.png";
import mark from "@/assets/two-mark.png";
import { cn } from "@/lib/utils";

export function BrandWordmark({ className }: { className?: string }) {
  return (
    <img
      src={wordmark}
      alt="TWO"
      width={633}
      height={331}
      loading="lazy"
      decoding="async"
      className={cn("h-auto w-full select-none object-contain", className)}
    />
  );
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src={mark}
      alt=""
      aria-hidden
      width={1024}
      height={1024}
      loading="lazy"
      decoding="async"
      className={cn("select-none object-contain", className)}
    />
  );
}
