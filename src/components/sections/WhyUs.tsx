import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Header } from "./Services";
import { useCMS } from "@/hooks/useCMS";

function Counter({ to, suffix = "", duration = 1.8 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function WhyUs() {
  const { data } = useCMS();
  const whyUs = data.whyUs;
  
  return (
    <section className="container-bs py-32">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Header
            center={false}
            eyebrow={whyUs.eyebrow}
            title={whyUs.title}
            sub={whyUs.sub}
          />
          <ul className="mt-10 space-y-4 text-sm text-foreground/85">
            {(whyUs.bullets || []).map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-primary/20 text-primary">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {(whyUs.counters || []).map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass relative overflow-hidden rounded-3xl p-8"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
              <div className="font-display text-5xl font-bold text-gradient md:text-6xl">
                <Counter to={s.v} suffix={s.s} />
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
