const ITEMS = [
  "Unreal Engine 5",
  "Open World",
  "Set In India",
  "Solo Developed",
  "During The Outbreak",
  "Cinematic Survival",
  "PC",
  "Made In India",
];

export function Marquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-border bg-card/40">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blood/60 to-transparent" />
      <div
        className="flex w-max gap-14 whitespace-nowrap py-6 will-change-transform"
        style={{ animation: "marquee-x 38s linear infinite" }}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-14 font-display text-sm uppercase tracking-[0.42em] text-muted-foreground"
          >
            <span className="transition-colors duration-500 hover:text-foreground">{item}</span>
            <span className="h-1 w-1 rotate-45 bg-blood" />
          </span>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-blood/60 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent" />
    </div>
  );
}