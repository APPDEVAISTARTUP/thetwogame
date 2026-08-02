const ITEMS = [
  "Unreal Engine 5",
  "Open World",
  "Solo Developed",
  "During The Outbreak",
  "Cinematic Survival",
  "PC",
  "Made In India",
];

export function Marquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-border bg-card/40 py-5">
      <div
        className="flex w-max gap-14 whitespace-nowrap will-change-transform"
        style={{ animation: "marquee-x 38s linear infinite" }}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-14 font-display text-sm uppercase tracking-[0.42em] text-muted-foreground"
          >
            {item}
            <span className="h-1 w-1 rotate-45 bg-blood" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
    </div>
  );
}