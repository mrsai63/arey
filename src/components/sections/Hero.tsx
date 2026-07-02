import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";
import { IconRenderer } from "@/components/ui/IconRenderer";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const { data } = useCMS();
  const heroData = data.hero;

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden pt-32">
      {/* background motion graphics */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.25),transparent_60%)] blur-3xl" />
        <div className="absolute right-[-10%] top-[10%] h-96 w-96 rounded-full bg-primary/20 blur-[120px] animate-float" />
        <div className="absolute left-[-10%] bottom-[5%] h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div style={{ y, opacity }} className="container-bs">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs tracking-wider text-foreground/80"
        >
          <span className="grid h-2 w-2 place-items-center rounded-full bg-primary animate-pulse-glow" />
          {heroData.badge}
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-[5.5rem]">
              <SplitReveal text={heroData.title1} />
              <SplitReveal text={heroData.title2} />
              <span className="block text-gradient">
                <SplitReveal text={heroData.titleGradient} delay={0.5} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg"
            >
              {heroData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to={heroData.primaryBtnLink as any}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-button font-semibold text-primary-foreground transition-all hover:scale-[1.03] glow-blue"
              >
                {heroData.primaryBtnText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to={heroData.secondaryBtnLink as any}
                className="group inline-flex items-center gap-3 rounded-full border border-border px-6 py-3.5 font-button font-medium text-foreground/90 hover:border-primary/60"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/15 text-primary">
                  <Play className="h-3 w-3 fill-current" />
                </span>
                {heroData.secondaryBtnText}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-12 flex flex-wrap items-center gap-8 text-sm text-muted-foreground"
            >
              {heroData.stats?.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-semibold text-foreground">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative h-[500px] lg:col-span-5">
            {/* center glow ring */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative h-72 w-72">
                <div className="absolute inset-0 rounded-full border border-primary/30" />
                <div className="absolute inset-6 rounded-full border border-primary/20 animate-spin-slow" />
                <div className="absolute inset-12 rounded-full border border-primary/10" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center font-display">
                    <div className="text-[10px] tracking-[0.4em] text-primary/80">SINCE</div>
                    <div className="text-5xl font-bold text-gradient">{heroData.sinceYear}</div>
                    <div className="text-[10px] tracking-[0.3em] text-muted-foreground">{heroData.sinceText}</div>
                  </div>
                </div>
              </div>
            </div>

            {heroData.floatingCards?.map((c, i) => {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.8 + (c.delay || 0), duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ left: c.x, top: c.y }}
                  className="absolute glass animate-float w-44 rounded-2xl p-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary">
                      <IconRenderer name={c.icon} className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{c.label}</div>
                      <div className="font-display text-sm font-semibold text-foreground">{c.value}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SplitReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ delay: 0.3 + delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  );
}
