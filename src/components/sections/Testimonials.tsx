import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Header } from "./Services";
import { useCMS } from "@/hooks/useCMS";

export function Testimonials() {
  const { data } = useCMS();
  const testSection = data.testimonials;
  const items = testSection.items || [];
  const row = [...items, ...items];

  return (
    <section className="py-32" id="testimonials">
      <div className="container-bs">
        <Header
          eyebrow={testSection.eyebrow}
          title={testSection.title}
          sub={testSection.sub}
        />
      </div>

      <div className="group relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max gap-6 animate-marquee group-hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <motion.figure
              key={i}
              className="glass w-[360px] shrink-0 rounded-3xl p-7"
            >
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.text}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-primary/50 font-display font-semibold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
