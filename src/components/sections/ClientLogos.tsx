import { useCMS } from "@/hooks/useCMS";

export function ClientLogos() {
  const { data } = useCMS();
  const logos = data.clientLogos || [];
  const row = [...logos, ...logos];
  
  return (
    <section className="border-y border-border/60 bg-surface/40 py-12">
      <div className="container-bs mb-6 text-center text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
        Trusted by ambitious brands across India
      </div>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max gap-16 animate-marquee group-hover:[animation-play-state:paused]">
          {row.map((l, i) => (
            <span key={i} className="font-display text-2xl font-semibold tracking-tight text-foreground/40 transition-colors hover:text-foreground">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
