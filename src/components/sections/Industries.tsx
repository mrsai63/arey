import { motion } from "framer-motion";
import { Header } from "./Services";
import { useCMS } from "@/hooks/useCMS";
import { IconRenderer } from "@/components/ui/IconRenderer";

export function Industries() {
  const { data } = useCMS();
  const indSection = data.industries;
  const items = indSection.items || [];

  return (
    <section className="container-bs py-32" id="industries">
      <Header
        eyebrow={indSection.eyebrow}
        title={indSection.title}
        sub={indSection.sub}
      />
      <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {items.map((it, i) => {
          return (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 6) * 0.04, duration: 0.5 }}
              className="group relative flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface/40 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:bg-surface hover:shadow-[0_20px_40px_-20px_rgba(10,132,255,0.5)]"
            >
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(10,132,255,0.15),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />
              <IconRenderer name={it.icon} className="relative h-7 w-7 text-foreground/80 transition-colors group-hover:text-primary" />
              <span className="relative text-center text-xs font-medium text-foreground/85">{it.label}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
