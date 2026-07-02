import { motion } from "framer-motion";
import { useCMS } from "@/hooks/useCMS";
import { IconRenderer } from "@/components/ui/IconRenderer";

export function Services() {
  const { data } = useCMS();
  const servicesSection = data.services;
  const services = servicesSection.items || [];

  return (
    <section className="container-bs relative py-32" id="services">
      <Header
        eyebrow={servicesSection.eyebrow}
        title={servicesSection.title}
        sub={servicesSection.sub}
      />

      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => {
          return (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
              className="group relative overflow-hidden bg-background p-6 transition-all duration-500 hover:bg-surface"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(10,132,255,0.18),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-6 inline-grid h-12 w-12 place-items-center rounded-xl border border-border bg-surface text-primary transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/60 group-hover:bg-primary/15">
                  <IconRenderer name={s.icon} className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-all duration-500 group-hover:opacity-100">
                  Learn more →
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

export function Header({
  eyebrow, title, sub, center = true,
}: { eyebrow: string; title: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : ""}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-foreground/80"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-5 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-base text-muted-foreground md:text-lg"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
